import routerx from 'express-promise-router';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import personController from '../controllers/personController';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add-person', [
    auth.verifyAuth,
    check('tipo_persona', 'Campo tipo persona obligatorio').notEmpty(),
    check('name', 'Nombre obligatorio').notEmpty(),
    check('email','Formato de correo no valido').isEmail(),
    validarCampos
], personController.add);

router.get('/query-person',[
    auth.verifyAuth,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],personController.query);

router.get('/get-person',[auth.verifyAuth,],personController.list);

router.put('/update-person', [
    auth.verifyAuth,
    check('_id','Id no valido').isMongoId(),
    check('tipo_persona', 'Campo tipo persona obligatorio').notEmpty(),
    check('name', 'Nombre obligatorio').notEmpty(),
    validarCampos
], personController.update);

router.put('/deactivate-person',[
    auth.verifyAuth,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],personController.deactivate);

router.put('/activate-person',[
    auth.verifyAuth,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],personController.activate);

router.get('/get-clientes',[auth.verifyAuth,],personController.listClientes);
router.get('/get-proveedores',[auth.verifyAuth,],personController.listProveedores);



export default router;