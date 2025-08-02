import { tourSearchableField } from "./constrain";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { QueryBuilder } from "../utiles/QueryBuilder";


/** Tour  */
const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }

    const tour = await Tour.create(payload)
    return tour;
};



const getAllTours = async (query: Record<string, string>) => {
    /**
     * const filter = query;
    console.log(filter);
    const searchTerm = query.searchTerm || "";
    const sort = query.sort || "createdAt";
    /** const excludedField = ["searchTerm", "sort"];  
    const fields = query.fields?.split(",").join(" ") || "";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    for (const field of excludedField) {
        delete filter[field];
    }
     */

    const queryBuilder = new QueryBuilder(Tour.find(), query);
    const tours = await queryBuilder
        .search(tourSearchableField)
        .sort()
        .paginate()
        .fields()
        .filter()

    console.log(queryBuilder);
    
    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])
    // const searchArray = {
    //     $or: tourSearchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
    // }
    // const tours = await Tour.find(searchArray).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
    // const totalTours = await Tour.countDocuments();
    // const totalPage = Math.ceil(totalTours / limit);
    // const meta = {
    //     page: page,
    //     limit: limit,
    //     total: totalTours,
    //     totalPage: totalPage
    // }
    return {
        data,
        meta 
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