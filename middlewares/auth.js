import tokenService from '../services/token';

const verifyAuth = async(req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            msj: 'No existe el token'
        });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol === 'Administrador' || response.rol === 'Vendedor' || response.rol === 'Almacenero') {
        next();
    } else {
        return res.status(403).send({
            msj: 'No autorizado'
        });
    }

}

const verifyAdministrador = async(req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            msj: 'No existe el token'
        });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol === 'Administrador') {
        next();
    } else {
        return res.status(403).send({
            msj: 'No tienes permiso de administrador'
        });
    }

}

const verifyAlmacenero =async (req, res, next) => {
    if(!req.headers.token){
        return res.status(404).send({
            msj:'No existe el token'
        });
    }
    const response=await tokenService.decode(req.headers.token);
    if(response.rol==='Administrador'||response.rol==='Almacenero'){
        next();
    }else{
        return res.status(403).send({
            msj:'No autorizado'
        });
    }

}

const verifyVendedor =async (req, res, next) => {
    if(!req.headers.token){
        return res.status(404).send({
            msj:'No existe el token'
        });
    }
    const response=await tokenService.decode(req.headers.token);
    if(response.rol==='Administrador'|| response.rol==='Vendedor'){
        next();
    }else{
        return res.status(403).send({
            msj:'No autorizado'
        });
    }

}

export default{
    verifyAuth,
    verifyAdministrador,
    verifyAlmacenero,
    verifyVendedor
}