import {validationResult} from 'express-validator';

const validarCampos=(req,res,next)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){return res.status(400).json(err)};
    next();
}

export default validarCampos;