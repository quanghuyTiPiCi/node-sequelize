import db from '../models';

let getTopDoctor = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: 'R2' },
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: db.Allcode,
            as: 'positionData',
            attributes: ['valueEn', 'valueVi'],
          },
          {
            model: db.Allcode,
            as: 'genderData',
            attributes: ['valueEn', 'valueVi'],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: 'R2',
        },
        attributes: {
          exclude: ['password', 'image'],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let saveDetailInforDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        if (data.action === 'CREATE') {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
        } else if (data.action === 'EDIT') {
          let doctorMarkdown = await db.Mardown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            (doctorMarkdown.contentHTML = data.contentHTML),
              (doctorMarkdown.contentMarkdown = data.contentMarkdown),
              (doctorMarkdown.description = data.description),
              (doctorMarkdown.doctorId = data.doctorId),
              (doctorMarkdown.updatedAt = new Date()),
              await doctorMarkdown.save();
          }
        }
        resolve({
          errCode: 0,
          errMessage: 'Save infor doctor successfully',
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getDetailDoctorById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ['password', 'image'],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ['description', 'contentHTML', 'contentMarkdown'],
            },
            {
              model: db.Allcode,
              as: 'positionData',
              attributes: ['valueEn', 'valueVi'],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let bulkCreateSchedules = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedules: bulkCreateSchedules,
};
