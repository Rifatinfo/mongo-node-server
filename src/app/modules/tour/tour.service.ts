
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

/** Tour  */

const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }

    const tour = await Tour.create(payload)

    return tour;
};

const getAllTours = async (query : Record< string, string>) => {
   const filter = query;
   console.log(filter);
   const searchTerm = query.searchTerm || "";
   const tourSearchableField = ["title", "description", "location"]
   delete filter["searchTerm"];
   const searchArray = {
    $or: tourSearchableField.map(field => ({[field] : {$regex : searchTerm, $options: "i"}}))
   }
   const tours = await Tour.find(searchArray).find(filter);
   const totalTours = await Tour.countDocuments();
   return {
    data : tours,
    meta : {
        total : totalTours
    }
   }
}

/** Tour Types */
const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

      return await TourType.create({ name: payload.name });
};

export const TourService = {
    createTour,
    createTourType,
    getAllTours

};