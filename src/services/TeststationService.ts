import Teststation, { ITeststation } from "../entities/Teststation"
import { v4 as UUID } from "uuid"

export class TeststationService {
  public static create(station: ITeststation): Promise<Teststation> {
    const insertPayload: ITeststation = {
      id: UUID(),
      ...station
    }
    return Teststation.create(insertPayload)
  }

  public static find(id: string): Promise<Teststation | null> {
    return Teststation.findByPk(id)
  }

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
}
