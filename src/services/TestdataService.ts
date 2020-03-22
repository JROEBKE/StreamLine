import Teststation, { ITeststation } from "../entities/Teststation"
import Appointment, { IAppointment } from "../entities/Appointment"
import { v4 as UUID } from "uuid"
import {sequelize} from "../Database"
import { AppointmentService } from './AppointmentService';
import { TeststationService } from './TeststationService';

//import {momentRandom} from "moment-random";   //why is this not working?

/* This does not work so far
export class TestdataService { 

  
  public static async createStations(): Promise<Teststation> {

    for(let i=0; i <= 30; i++) {

      var randomNumber =  Math.round(Math.random() * 10)
      var newLabel = "Testzentrum Berlin "+i
      var newLon = Math.random() + 50
      var newLan = Math.random() + 13
      var newCoordinates = [newLon,newLan]

      var newStation =  {
        id: UUID(),      
        label: newLabel,
        city: "Hamburg",
        postCode: "11111",
        street: "Lindenstraße",
        houseNumber: "1",
        coordinates: newCoordinates,
        capacity: randomNumber,
        stationType: "STATIONARY",  // Incompatible to provided values?
        openingTime: 08, 
        closingTime: 20,
        createdAt: "2020-03-21T19:32:17.422Z"
      }

      console.log(newStation)
      var results = await TeststationService.create(newStation)

    }             
      
    return results
    
  }
  

  public static async createAppointments(): Promise<Appointment> {

    const fixNewAppointment = {
      id: UUID(),
      teststation: "f3413705-cedb-4aee-8261-3d619df84244",
      timeslot: "2020-03-25 23:55:26.175177+01",
      patientIdentifier: "11212"
    }

    var fixStationId = "f3413705-cedb-4aee-8261-3d619df84244"

    var result = await AppointmentService.create(fixNewAppointment, fixStationId)

    return result;

    /*
    
    var newStations = [
      "f3413705-cedb-4aee-8261-3d619df84244",
      "f3413705-cedb-4aee-8261-3d619df84244",
      "f3413705-cedb-4aee-8261-3d619df84244"
    ]
    
    var start = "2020-03-22"
    var end = "2020-06-22"


    for(let i=0; i < newStations.length; i++) {

      var newStationId = newStations[i]
      //var randomhour =  Math.round(Math.random() * 10)
      //var newTimeslot = momentRandom(end, start)
      //var newPatient = Math.round(Math.random() * 1000)
      
      var newAppointment = {
        id: UUID(),
        teststation: "f3413705-cedb-4aee-8261-3d619df84244",
        //timeslot: newTimeslot,
        patientIdentifier: newPatient
      }
      
      console.log(newAppointment)
      
      var result = await AppointmentService.create(newAppointment2, newStationId)
     
    }  
    


    
  }
  
}
*/