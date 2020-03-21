import {Sequelize} from 'sequelize-typescript';
import Teststation from '@entities/Teststation';

export const sequelize =  new Sequelize({
  database: 'streamline',
  dialect: 'postgres',
  username: 'root',
  password: 'password',
  models: [Teststation], // or [Player, Team],
});

sequelize.addModels([Teststation]);
