import { Request, Response, NextFunction } from "express";
import { doctorService } from "./doctor.service";
import { HttpStatus } from "../../constants/httpStatus";

const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctor = await doctorService.createDoctor(req.body);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Doctor created successfully',
            data: doctor
        });
    } catch (error) {   
        next(error);
    }
};

const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctors = await doctorService.getAllDoctors()
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'doctors retrieved successfully',
            data: doctors
        });
    } catch (error) {
        next(error)
    }
}


export const doctorController = {
    createDoctor,
    getAllDoctors
};