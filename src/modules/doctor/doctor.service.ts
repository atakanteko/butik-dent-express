import mongoose from "mongoose";
import User from "../user/user.model";
import Doctor from "./doctor.model";
import { ICreateDoctor } from "./doctor.types";
import { ROLES } from "../../constants/roles";
import { roleService } from "../role/role.service";

export const createDoctor = async (data: ICreateDoctor) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const role = await roleService.getRoleByName(ROLES.DOCTOR);

    const user = await User.create([{
      name: data.name,
      email: data.email,
      passwordHash: data.password,
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


export const doctorService = {
    createDoctor
};