import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/getuser/:username', userController.getByUser);
router.get('/:idUsuario', userController.getById);
router.put('/:idUsuario', userController.update);
router.delete('/:id', userController.delete);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/login-verify', userController.loginVerify);
router.post('/change', userController.changePassword);


export default router;