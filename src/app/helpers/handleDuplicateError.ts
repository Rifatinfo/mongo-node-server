import { TGenericErrorResponse } from "../interfaces/error.types";

export const handleDuplicateError = (err : any) : TGenericErrorResponse => {
    const matchedArray = err.message?.match(/"([^"]*)"/);
    const value = matchedArray?.[1] || "Field"

    return {
        statusCode : 400,
        message : `${value} already exists!!`
    }
}