import Teststation, { ITeststation } from "../entities/Teststation"
import { v4 as UUID } from "uuid"
import {sequelize} from "../Database"
import QueryTypes from 'sequelize/types/lib/query-types'

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
      }
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

  public static findNearByAndSpare(lat: number, lon: number): Promise<Teststation[]> {
    return sequelize.query(`
    SELECT
      teststations.*,  COUNT(appointments.teststation) as appointments
    FROM
      teststations
      LEFT JOIN appointments ON teststations.id = appointments.teststation
      AND
      date(appointments.timeslot) = date(now())
    WHERE
      ST_DistanceSphere(coordinates, ST_MakePoint(:lat,:lon)) <= 15 * 1000
    GROUP BY teststations.id, appointments.timeslot
    HAVING 
    COALESCE(date(appointments.timeslot),date(now())) = date(now())
    AND
    COUNT(appointments.teststation) < teststations.capacity 

    `, {
    replacements: { lat, lon },
      //model: Teststation,
      //mapToModel: true,
      type: "SELECT"
    })

  }
}
