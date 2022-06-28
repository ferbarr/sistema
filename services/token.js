import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel';

const checkToken = async (token) => {
    let __id;
    try {
        const { _id } = await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false;
    }

    const user=await Usuario.findOne({_id:__id,estado:1});
    if(user){
        const token=jwt.sign({_id:__id},'P4szW0',{expiresIn:'1h'});
        return {token, rol: user.rol, _id: user._id, user: user.user};
    }else{
        return false;
    }
}

const encode = async (_id,rol,user) => {//Generar token
    const token = jwt.sign({  rol, _id, user }, 'P4szW0#d', { expiresIn: '1h' });
    return token;
}

const decode = async (token) => {//Decodificar token
    try {
        const { _id } = await jwt.verify(token, 'P4szW0');
        const user = await Usuario.findOne({ _id, estado: 1 });
        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (e) {
        const newToken=await checkToken(token);
        return newToken;
    }
}

export default {
    encode,
    decode
}