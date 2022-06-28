import routerx from 'express-promise-router';
import categoryRouter from './categoryRoute';
import articleRouter from './articleRoute';
import userRouter from './userRoute';
import personRouter from './personRoute';
const router=routerx();

router.use('/users',userRouter);
router.use('/category',categoryRouter);
router.use('/article',articleRouter);
router.use('/person',personRouter);


export default router;