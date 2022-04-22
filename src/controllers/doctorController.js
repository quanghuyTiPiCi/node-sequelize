import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctor(+limit);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let response = await doctorService.getAllDoctors();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let getDetailDoctor = async (req, res) => {
  try {
    let response = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await doctorService.bulkCreateSchedules(req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctor: getDetailDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
};
