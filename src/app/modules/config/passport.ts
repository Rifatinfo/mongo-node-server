import passport, { Profile } from "passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";

passport.use(
    new Strategy(
        {
            clientID : envVars.GOOGLE_CLIENTS_ID,
            clientSecret : envVars.GOOGLE_CLIENTS_SECRET,
            callbackURL : envVars.GOOGLE_CALLBACK_URL
        } , async (accessToken : string, refreshToken: string , profile : Profile, done : VerifyCallback) => {
            try {
              const email = profile.emails?.[0].value;
              if(!email){
                return done(null, false, {message : "No email found"})
              }
              let user = await User.findOne({email});

              if(!user){
                 user = await User.create({
                    email,
                    name : profile.displayName,
                    picture : profile.photos?.[0].value,
                    role : Role.USER,
                    isVerified : true,

                    auth : [
                        {
                            provider : "google",
                            providerId : profile.id
                        }
                    ]
                 })
              }

              return done(null, user)
            } catch(error){
              return done(error);
            }
        }
    )
)

passport.serializeUser((user : any, done : (err : any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done : any) => {
    try{
      const user = await User.findById(id);
      done(null, user);
    } catch(error){
      done(error)
    }
})