import { Table, Model, Column, PrimaryKey, DataType } from "sequelize-typescript";

export enum TeststationType {
  DRIVE_IN = "DRIVE_IN",
  STATIONARY = "STATIONARY"
}

export interface ITeststation{
  id: string
  label: string
  city: string
  postCode: string
  street: string
  houseNumber: string
  //TODO to be refactored
  coordinates: any
  openingTime: number
  closingTime: number
  capacity: number
  stationType: TeststationType
}

@Table({modelName: 'teststations'})
class Teststation extends Model<TeststationType> {

  @PrimaryKey
  @Column
  id: string

  @Column
  label: string

  @Column
  city: string

  @Column
  postCode: string

  @Column
  street: string

  @Column
  houseNumber: string

  @Column({type: DataType.GEOGRAPHY})
  coordinates: number

  @Column
  capacity: number

  @Column
  stationType: TeststationType

  @Column({type: DataType.TIME})
  openingTime: number

  @Column({type: DataType.TIME})
  closingTime: number

  //@HasMany(() => Appointment)
  //appointments: Appointment[];

}

export default Teststation
