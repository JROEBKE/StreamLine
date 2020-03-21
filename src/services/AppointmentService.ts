import Appointment, { IAppointment } from "../entities/Appointment"
import { v4 as UUID } from "uuid"
import {sequelize} from "../Database"
import QueryTypes from 'sequelize/types/lib/query-types'

export class AppointmentService {
  /*
    * TODO:
    * We must add some validations for the payload prior to inserting
    *
    */
  public static create(appointment: IAppointment, stationId: string): Promise<Appointment> {

    const insertPayload: IAppointment = {
      ...appointment,
      stationId: stationId,
      id: UUID()
    }
    return Appointment.create(insertPayload)
  }

  public static find(id: string): Promise<Appointment | null> {
    return Appointment.findByPk(id)
  }

  /*
    * TODO:
    * We must check later if the user, who requests to delete this
    * actually has permissions to do so.
    *
    */
  public static async delete(id: string): Promise<void> {
    const maybeAppointment = await Appointment.findByPk(id)

    if(maybeAppointment) {
      return maybeAppointment.destroy()
    } else {
      return Promise.resolve()
    }
  }

  public static findAll(): Promise<Appointment[]> {
    return Appointment.findAll()
  }

}
