import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
import Users from '../../models/Users';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select({
      userName: 1,
      email: 1,
      roleCode: 1,
    });
    return successResponse(req, res, users);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleCode,
    } = req.body;
    const user = await Users.findOne({ email });

    if (user && !user.deleted) {
      throw new Error('User already exists with same email');
    }
    let reqPass;
    if (password) {
      reqPass = crypto.createHash('md5').update(password).digest('hex');
    }
    let payload = {
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      userName: `${firstName} ${lastName}` || '',
      roleCode: roleCode || '',
      password: reqPass || '',
    };
    let userDetail = await Users.create(payload);
    const token = jwt.sign(
      {
        user: {
          userId: userData.id,
          email: userData.email,
          createdAt: userData.lastLogin,
        },
      },
      process.env.SECRET
    );
    delete userData.password;
    return successResponse(req, res, { token, userDetail });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    let user = await Users.findOne({
      email: req.body.email,
    }).select({
      _id: 1,
      email: 1,
      password: 1,
    });
    if (!user) {
      throw new Error('Incorrect Email Id/Password');
    }
    if (req.body.password) {
      const reqPass = crypto
        .createHash('md5')
        .update(req.body.password || '')
        .digest('hex');
      if (reqPass !== user.password) {
        throw new Error('Incorrect Email Id/Password');
      }
    }
    user = await Users.findOne({_id: user.id });
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: user.lastLogin,
        },
      },
      process.env.SECRET
    );
    delete user.password;
    return successResponse(req, res, { token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await Users.findOne({_id: userId });
    
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
