import bcrypt from 'bcryptjs';
import db from '../models';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      });
      resolve('Create a new user successed');
    } catch (err) {
      reject(err);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userInfor = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (userInfor) {
        resolve(userInfor);
      } else {
        resolve({});
      }
    } catch (err) {
      reject(err);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (err) {
      console.log(err);
    }
  });
};

let deleteUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await db.User.destroy({
          where: { id: id },
        });
      }
      resolve();
    } catch (err) {
      reject();
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
