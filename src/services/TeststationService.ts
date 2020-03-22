import Teststation, { ITeststation } from "../entities/Teststation"
import { v4 as UUID } from "uuid"
import {sequelize} from "../Database"
import dayjs from "dayjs";
import { AppointmentService } from './AppointmentService';

export class TeststationService {
  /*
    * TODO:
    * We must add some validations for the payload prior to inserting
    *
    */
  public static create(station: ITeststation): Promise<Teststation> {
    const insertPayload: ITeststation = {
      ...station,
      id: UUID(),
      coordinates: {
        type: "POINT",
        coordinates: station.coordinates,
        crs: { "type": "name", "properties": { "name": "EPSG:4326"}}
      } as any // TODO: yolo
    }
    return Teststation.create(insertPayload)
  }

  public static find(id: string): Promise<Teststation | null> {
    return Teststation.findByPk(id)
  }

  /*
    * TODO:
    * We must check later if the user, who requests to delete this
    * actually has permissions to do so.
    *
    */
  public static async delete(id: string): Promise<void> {
    const maybeStation = await Teststation.findByPk(id)

    if(maybeStation) {
      return maybeStation.destroy()
    } else {
      return Promise.resolve()
    }
  }

  public static findAll(): Promise<Teststation[]> {
    return Teststation.findAll()
  }

  public static findNearBy(lat: number, lon: number): Promise<Teststation[]> {
    return sequelize.query(`
       SELECT * FROM teststations
       WHERE ST_DistanceSphere(coordinates, ST_MakePoint(:lat,:lon)) <= 15*1000
    `, {
    replacements: { lat, lon },
      model: Teststation,
      mapToModel: true,
      type: "SELECT"
    })
  }

  public static async findNearByAndSpareForDateRange(lat: number, lon: number): Promise<{[index: string]: Teststation[]}> {
    const DAYS = 7;
    const result: {[index: string]: Teststation[]} = {}

    const today = dayjs()

    for(let i=0; i <= DAYS; i++) {
      const appointments = await this.findNearByAndSpare(lat, lon, i)
      const date = today.add(i, 'day')

      result[date.format('YYYY-MM-DD')] = appointments
    }

    return result
  }


  //TODO sort by distance and workload

  public static findNearByAndSpare(lat: number, lon: number, offset: number=0): Promise<Teststation[]> {
    let offsetStatement = offset + ' day'
    return sequelize.query(`
      SELECT
        distinct(teststations.*),  COUNT(appointments.teststation) as appointments
      FROM
        teststations
        LEFT JOIN appointments ON teststations.id = appointments.teststation
        AND
        date(appointments.timeslot) = date(NOW() + interval :offsetStatement)
      WHERE
        ST_DistanceSphere(coordinates, ST_MakePoint(:lat, :lon)) <= 15 * 1000
      GROUP BY teststations.id, appointments.timeslot
      HAVING
      COALESCE(date(appointments.timeslot),date(NOW() + interval :offsetStatement)) = date(NOW() + interval :offsetStatement)
      AND
      COUNT(appointments.teststation) < teststations.capacity
      `, {
      replacements: { lat, lon, offsetStatement },
      type: "SELECT"
    }) as Promise<Teststation[]>

  }
  

  public static async workloadSingleStation(id: string, date: string): Promise<Teststation[]> {
    
    //ToDo validation of input if in correct format

     return sequelize.query(`
      SELECT
        teststations.*,  COUNT(appointments.teststation) as appointments
      FROM
        teststations
        LEFT JOIN appointments ON teststations.id = appointments.teststation
        AND
        date(appointments.timeslot) = date(:date)
      WHERE
      teststations.id = :id
      GROUP BY teststations.id
      `, {
      replacements: { date, id },
      model: Teststation,
      mapToModel: true,
      type: "SELECT"
    })

  }




}
