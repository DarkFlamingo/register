import {
  UserModel,
  AuthoritiesModel,
  BlankModel,
  CodeModel,
  ExtractModel,
  LogModel,
  OldValueModel,
  OrganizationModel,
  PassportModel,
  PositionModel
} from '../models';
import { Authorities } from './authorities/authorities.repository';
import { Blank } from './blank/blank.repository';
import { Code } from './code/code.repository';
import { Extract } from './extract/extract.repository';
import { Log } from './log/log.repository';
import { OldValue } from './old_value/old_value.repository';
import { Organization } from './organization/organization.repository';
import { Passport } from './passport/passport.repository';
import { Position } from './position/position.repository';
import { User } from './user/user.repository';

const user = new User({
  userModel: UserModel
});

const authorities = new Authorities({
  authoritiesModel: AuthoritiesModel
});

const passport = new Passport({
  passportModel: PassportModel
});

const blank = new Blank({
  blankModel: BlankModel,
  codeModel: CodeModel
});

const code = new Code({
  codeModel: CodeModel
});

const organization = new Organization({
  organizationModel: OrganizationModel
});

const position = new Position({
  positionModel: PositionModel
});

export { user, authorities, passport, blank, code, organization, position };
