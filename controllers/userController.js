import Usuario from '../models/userModel';
import bcrypt from 'bcryptjs';
import token from '../services/token';
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dafdqsakr',
    api_key: '685822558245377',
    api_secret: '8wOm51wbK6zkRnqbj-IwuktQi5o'
});

const add = async (req, res, next) => {
    const datos = req.body;

    try {
        const usuario = await new Usuario(datos);
        const verifyUser = await Usuario.findOne({ user: datos.user });
        if (verifyUser) {
            return res.status(400).json({
                msj: 'Usuario existente'
            });
        }
        usuario.password = bcrypt.hashSync(datos.password, 10);

        if (req.files) {
            const { tempFilePath } = req.files.photo;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
            usuario.photo = secure_url;
        }

        await usuario.save();
        res.json(usuario);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const update = async (req, res, next) => {
    const { _id, password, user, ...resto } = req.body;
    const userU = await Usuario.findById(_id);//Para la foto
    const verifyUser = await Usuario.findOne({ user });//Para el user
    let photo = null;
    if (req.files) {
        photo = req.files.photo;
    }
    if (photo) {
        if (userU.photo) {//Si ya tiene una foto la eliminamos
            const nombreB = userU.photo.split('/');
            const nombre = nombreB[nombreB.length - 1];
            const [public_id] = nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = photo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        resto.photo = secure_url;
    }



    if (userU.user !== user && !verifyUser) {//Actualizar user
        resto.user = user;
    }



    if (password) {//Actualizar password
        resto.password = bcrypt.hashSync(password, 10);
    }
    try {
        const usuario = await Usuario.findByIdAndUpdate(_id, resto);

        res.json(usuario);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}
const query = async (req, res, next) => {
    try {
        const reg = await Usuario.findOne({ _id: req.query._id });
        if (!reg) {
            return res.status(404).send({
                msj: 'No existe el usuario'
            });
        }
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const list = async (req, res, next) => {
    const valor = req.query.valor;
    try {
        const reg = await Usuario.find({ $or: [{ 'name': new RegExp(valor, 'i') }] }, { createdAt: 0 })
            .sort({ 'createdAt': -1 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}
const activate = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const reg = await Usuario.findByIdAndUpdate({ _id }, { estado: 1 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const deactivate = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const reg = await Usuario.findByIdAndUpdate({ _id }, { estado: 0 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const login = async (req, res, next) => {
    const {user,password}=req.body;
    if(!password)return res.status(400).json({msj:'Indica la contraseña'});
    try {        
        const usuario=await Usuario.findOne({user});
        
        if(usuario){
            if (usuario.estado === 0) {
                return res.status(400).json({
                    msj: 'Usuario desactivado'
                });
            }
            const veriPass=await bcrypt.compare(password,usuario.password);
            if(veriPass){
                const tokenReturn=await token.encode(usuario._id,usuario.rol,usuario.user);
                res.json({usuario,tokenReturn});
            }else{
                return res.status(400).json({
                    msj: 'Contraseña incorrecta'
                })
            }
        }else{
            return res.status(400).json({
                msj: 'No existe el usuario'
            })
        }
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}


export default {
    add,
    update,
    query,
    list,
    activate,
    deactivate,
    login
}

