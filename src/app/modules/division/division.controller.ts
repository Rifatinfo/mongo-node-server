import { Request, Response } from "express"
import { catchAsync } from "../middleswares/catchAsync"

const createDivision = catchAsync(async (req : Request, res : Response) => {
//  const result = await 
})

export const DivisionController = { 
   createDivision
}