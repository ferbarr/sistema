import routerx from 'express-promise-router';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import userController from '../controllers/userController';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add-user', [
    auth.verifyAdministrador,
    check('user', 'Campo usuario obligatorio').notEmpty(),
    check('user', 'Minimo 3 letras').isLength({ min: 3 }),
    check('name', 'Nombre obligatorio').notEmpty(),
    check('rol', 'Rol obligatorio').notEmpty(),
    check('password', 'Minimo 6 letras').isLength({ min: 6 }),

    validarCampos
], userController.add);

router.get('/query-user',[
    auth.verifyAdministrador,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],userController.query);

router.get('/get-user',[auth.verifyAdministrador,],userController.list);

router.put('/update-user', [
    auth.verifyAdministrador,
    check('_id', 'Id no valido').isMongoId(),
    check('user', 'Campo usuario obligatorio').notEmpty(),
    check('user', 'Minimo 3 letras').isLength({ min: 3 }),
    check('name', 'Nombre obligatorio').notEmpty(),
    check('rol', 'Rol obligatorio').notEmpty(),
    validarCampos
], userController.update);

router.put('/deactivate-user',[
    auth.verifyAdministrador,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],userController.deactivate);

router.put('/activate-user',[
    auth.verifyAdministrador,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],userController.activate);

router.post('/login',userController.login);

export default router;