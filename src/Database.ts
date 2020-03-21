import {Sequelize} from 'sequelize-typescript';
import Teststation from '@entities/Teststation';
import Appointment from '@entities/Appointment';

export const sequelize =  new Sequelize({
  database: 'streamline',
  dialect: 'postgres',
  username: 'root',
  password: 'password',
  models: [Teststation, Appointment], // or [Player, Team],
});

sequelize.addModels([Teststation]);
sequelize.addModels([Appointment]);