import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.displayGetCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  //API
  router.post('/api/login', userController.handleLogin);
  router.get('/api/all-users', userController.getAllUsers);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);
  //All codes
  router.get('/api/allcode', userController.getAllcode);

  //Doctor
  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/api/get-all-doctor', doctorController.getAllDoctors);
  router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
  router.get('/api/get-detail-doctor', doctorController.getDetailDoctor);
  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
  //Rest API
  return app.use('/', router);
};

module.exports = initWebRoutes;
