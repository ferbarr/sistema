import routerx from 'express-promise-router';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import articleController from '../controllers/articleController';
const router = routerx();


router.post('/add-article', [
    check('categoria', 'Campo categoria obligatorio').notEmpty(),
    check('categoria', 'Categoria no valida').isMongoId(),
    check('articulo', 'Campo articulo obligatorio').notEmpty(),
    check('precio_venta', 'Campo precio_venta obligatorio').notEmpty(),
    check('stock', 'Campo stock obligatorio').notEmpty(),
    validarCampos
], articleController.add);

router.get('/query-article', [
    check('_id', 'Id no valido').isMongoId(),
    validarCampos
], articleController.query);

router.get('/get-article', articleController.list);

router.put('/update-article', [
    check('_id', 'Id no valido').isMongoId(),
    check('categoria', 'Campo categoria obligatorio').notEmpty(),
    check('categoria', 'Categoria no valida').isMongoId(),
    check('articulo', 'Campo articulo obligatorio').notEmpty(),
    check('precio_venta', 'Campo precio_venta obligatorio').notEmpty(),
    check('stock', 'Campo stock obligatorio').notEmpty(),
    validarCampos
], articleController.update);

router.put('/deactivate-article',[
    check('_id','Id no valido').isMongoId(),
    validarCampos
],articleController.deactivate);

router.put('/activate-article',[
    check('_id','Id no valido').isMongoId(),
    validarCampos
],articleController.activate);

export default router;