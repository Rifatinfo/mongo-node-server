import { Request, Response } from "express"
import { catchAsync } from "../middleswares/catchAsync"
import { DivisionService } from "./division.service"
import { sendResponse } from "../middleswares/sendResponse";

const createDivision = catchAsync(async (req: Request, res: Response) => {
   const result = await DivisionService.createDivision(req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Division created",
      data: result
   })
})

const updateDivision = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;
   const result = await DivisionService.updateDivision(id, req.body);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Division update",
      data: result
   })
})

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
   const result = await DivisionService.getAllDivisions();
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Division Retrieved",
      data: result.data,
      meta : result.meta
   })
})

const getSingleDivision = catchAsync(async (req : Request, res : Response) => {
   const slug = req.params.slug
   const result = await DivisionService.getSingleDivision(slug);
   sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Division Retrieved",
      data: result.data
   })
})

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});
export const DivisionController = {
   createDivision,
   updateDivision,
   getAllDivisions,
   getSingleDivision,
   deleteDivision
}