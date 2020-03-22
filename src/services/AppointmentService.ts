import Appointment, { IAppointment } from "../entities/Appointment"
import { v4 as UUID } from "uuid"
import {sequelize} from "../Database"

export class AppointmentService {
  /*
    * TODO:
    * We must add some validations for the payload prior to inserting
    *
    */
  public static create(appointment: IAppointment, stationId: string): Promise<Appointment> {
    const insertPayload: IAppointment = {
      ...appointment,
      teststation: stationId,
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



  // Get all appointments for single station on specific date aka slot if provided
  
  public static async findAll(id: string, slot: string): Promise<Appointment[]> {
    console.log(slot)

    if (slot) {   
      return sequelize.query(`
        SELECT *
        FROM appointments
        WHERE date(appointments.timeslot) = date(:slot)
        AND teststation = :id
        `, {
        replacements: { id, slot },
        model: Appointment,
        mapToModel: true,
        type: "SELECT"
        }
      )
    } else {
      //ToDo just for a single station ID
      return sequelize.query(`
        SELECT *
        FROM appointments
        WHERE teststation = :id
        `, {
        replacements: { id },
        model: Appointment,
        mapToModel: true,
        type: "SELECT"
        }
      )
    }
    
  }

}
