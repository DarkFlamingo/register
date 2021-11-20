import { sequelize as orm } from '../db/connection';
import associate from '../db/associations';
import { init as initUserModel } from './user/user.model';

const User = initUserModel(orm);

associate({
  User
});

export { User as UserModel };
