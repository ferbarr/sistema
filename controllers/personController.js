import Persona from '../models/personModel';



const add = async (req, res, next) => {
    const datos = req.body;
    try {
        const persona = await new Persona(datos);
        await persona.save();
        res.json(persona);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const update = async (req, res, next) => {
    const { _id,...resto } = req.body;
    try {
        const persona = await Persona.findByIdAndUpdate(_id, resto);
        res.json(persona);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}
const query = async (req, res, next) => {
    const {_id}=req.query;
    try {
        const reg = await Persona.findOne({ _id });
        if (!reg) {
            return res.status(404).send({
                msj: 'No existe la persona'
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
        const reg = await Persona.find({ $or: [{ 'name': new RegExp(valor, 'i') }] }, { createdAt: 0 })
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
        const reg = await Persona.findByIdAndUpdate({ _id }, { estado: 1 });
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
        const reg = await Persona.findByIdAndUpdate({ _id }, { estado: 0 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const listClientes = async (req, res, next) => {
    const valor = req.query.valor;
    try {
        const reg = await Persona.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }],'tipo_persona':'Cliente','estado':1 }, { createdAt: 0 })
        .sort({ 'createdAt': -1 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const listProveedores = async (req, res, next) => {
    const valor = req.query.valor;
    try {
        const reg = await Persona.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }],'tipo_persona':'Proveedor','estado':1 }, { createdAt: 0 })
           .sort({ 'createdAt': -1 });
        res.json(reg);
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
    listClientes,
    listProveedores
}

