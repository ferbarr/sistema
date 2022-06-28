import routerx from 'express-promise-router';
import {check} from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import categoryController from '../controllers/categoryController';
import auth from '../middlewares/auth';
const router=routerx();

router.post('/add-category',[
    auth.verifyAlmacenero,
   check('categoria','Campo categoria obligatorio').notEmpty(),
    validarCampos
],categoryController.add);

router.get('/query-category',[
    auth.verifyAlmacenero,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],categoryController.query);

router.get('/get-category',[auth.verifyAlmacenero,],categoryController.list);

router.put('/update-category',[
    auth.verifyAlmacenero,
    check('_id','Id no valido').isMongoId(),
    check('categoria','Campo categoria obligatorio').notEmpty(),
    validarCampos
],categoryController.update);

router.put('/deactivate-category',[
    auth.verifyAlmacenero,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],categoryController.deactivate);

router.put('/activate-category',[
    auth.verifyAlmacenero,
    check('_id','Id no valido').isMongoId(),
    validarCampos
],categoryController.activate);

export default router;