import { UserModel } from '../models';
import { User } from './user/user.repository';

const user = new User({
  userModel: UserModel
});

export { user };
