import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

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
  stationType: TeststationType
}

@Table
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

  @Column
  stationType: TeststationType
}

export default Teststation
