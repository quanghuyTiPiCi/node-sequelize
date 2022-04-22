import db from '../models';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hasPassword = await bcrypt.hashSync(password, salt);
      resolve(hasPassword);
    } catch (err) {
      reject(err);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        //User already exist
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password', 'firstName', 'lastsName'],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //Compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'Ok';
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = 'User is not found';
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = 'Your email is not exist, Plz try other email';
      }
      resolve(userData);
    } catch (err) {
      reject(err);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getListUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';
      if (userId === 'ALL') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password'],
          },
        });
      }

      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Check email is existed
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: 'Your email existed, try another email, please!',
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === '1' ? true : false,
          roleId: data.roleId,
          positionId: data.position,
        });
        resolve({
          errCode: 0,
          errMessage: 'Ok',
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `The user isn't exist`,
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: 'The user is deleted',
      });
    } catch (err) {
      reject(err);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: 'Missing required parameters',
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.roleId = data.roleId),
          (user.positionId = data.positionId),
          (user.gender = data.gender),
          (user.phoneNumber = data.phoneNumber),
          await user.save();

        resolve({
          errCode: 0,
          message: 'Update successfully',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: 'User is not found',
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getListUsers: getListUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCodeService: getAllCodeService,
};
