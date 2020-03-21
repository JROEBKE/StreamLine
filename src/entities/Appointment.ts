import { Table, Model, Column, PrimaryKey, DataType } from "sequelize-typescript";




export interface IAppointment{
  id: string
  stationId: string
  timeslot: string
  // ToDo add creator as part of booking
  // creator: string
  // ToDO must be filtered based on creator to ensure no visibility
  patientIdentifier: string

}

@Table({modelName: 'appointments'})
class Appointment extends Model<IAppointment> {

  @PrimaryKey
  @Column
  id: string

  @Column
  @BelongsTo(() => Teststation)
  stationId: string


  @Column
  timeslot: string

  @Column
  patientIdentifier: string

}

export default Appointment
