import { Request, Response } from "express";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";
import { TourService } from "./tour.service";

/** Tour */
const createTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TourService.getAllTours(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

/** Tour Types */
const createTourType = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await TourService.createTourType({name});
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type created successfully',
        data: result,
    });
});

const getAllTourTypes = catchAsync(async (req : Request, res : Response) => {
   const result = await TourService.getAllToursTypes();
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour Type Retrieved Successfully',
        data: result,
    });
})

export const TourController = {
    createTour,
    createTourType,
    getAllTours,
    getAllTourTypes
};