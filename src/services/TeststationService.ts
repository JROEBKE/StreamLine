import Teststation, { ITeststation } from "../entities/Teststation"

export class TeststationService {
  public static create(station: ITeststation): Promise<Teststation> {
    return Teststation.create(station)
  }

  public static find(id: string): Promise<Teststation | null> {
    return Teststation.findByPk(id)
  }

  public static findAll(): Promise<Teststation[]> {
    return Teststation.findAll()
  }
}
