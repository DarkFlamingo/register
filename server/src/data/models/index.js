import { sequelize as orm } from '../db/connection';
import associate from '../db/associations';
import { init as initUserModel } from './user/user.model';
import { init as initAuthoritiesModel } from './authorities/authorities.model';
import { init as initBlankModel } from './blank/blank.model';
import { init as initCodeModel } from './code/code.model';
import { init as initExtractModel } from './extract/extract.model';
import { init as initLogModel } from './log/log.model';
import { init as initOldValueModel } from './old_value/old_value.model';
import { init as initOrganisationModel } from './organisation/organisation.model';
import { init as initPassportModel } from './passport/passport.model';
import { init as initPositionModel } from './position/position.model';

const User = initUserModel(orm);
const Authorities = initAuthoritiesModel(orm);
const Blank = initBlankModel(orm);
const Code = initCodeModel(orm);
const Extract = initExtractModel(orm);
const Log = initLogModel(orm);
const OldValue = initOldValueModel(orm);
const Organisation = initOrganisationModel(orm);
const Passport = initPassportModel(orm);
const Position = initPositionModel(orm);

associate({
  User,
  Authorities,
  Blank,
  Code,
  Extract,
  Log,
  OldValue,
  Organisation,
  Passport,
  Position
});

export {
  User as UserModel,
  Authorities as AuthoritiesModel,
  Blank as BlankModel,
  Code as CodeModel,
  Extract as ExtractModel,
  Log as LogModel,
  OldValue as OldValueModel,
  Organisation as OrganisationModel,
  Passport as PassportModel,
  Position as PositionModel
};
