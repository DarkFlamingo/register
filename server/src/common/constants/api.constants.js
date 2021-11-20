import { ApiPath, AuthApiPath, BlankApiPath } from '../enums/enums';

const WHITE_ROUTES = [
  `${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
  `${ApiPath.AUTH}${AuthApiPath.REGISTER}`,
  `${ApiPath.BLANK}${BlankApiPath.CHECK}`
];

export { WHITE_ROUTES };
