import { errorResponse } from '../helpers';
import { ROLE_CODE } from '../helpers/constants';

const adminAuth = (req, res, next) => {
  if (req.user && req.user.email && (req.user.roleCode === ROLE_CODE.ADMIN)) {
    return next();
  }
  return errorResponse(req, res, "You don't have admin access", 401);
};

export default adminAuth;
