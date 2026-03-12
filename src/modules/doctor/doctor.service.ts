import mongoose from "mongoose";
import User from "../user/user.model";
import Doctor from "./doctor.model";
import { ICreateDoctor } from "./doctor.types";
import { ROLES } from "../../constants/roles";
import { roleService } from "../role/role.service";
import bcrypt from "bcrypt-ts";
import { HttpStatus } from "../../constants/httpStatus";

export const createDoctor = async (data: ICreateDoctor) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const role = await roleService.getRoleByName(ROLES.DOCTOR);

    const existingUser = await User.findOne({ email: data.email.trim() });
    if (existingUser) {
        const error: Error = new Error('User with this email already exists');
        (error as any).status = HttpStatus.CONFLICT;
        throw error;
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)


    const user = await User.create([{
      name: data.name,
      email: data.email,
      passwordHash,
      roles: [role._id]
    }], { session });

    const doctor = await Doctor.create([{
      user: user[0]._id,
      specializations: [data.specialization],
      appointmentDuration: data.appointmentDuration
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return doctor[0];

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

export const getAllDoctors = async () => {
  const doctors = await Doctor.find().populate("user");
  return doctors;
};


export const doctorService = {
    createDoctor,
    getAllDoctors
};