import Categoria from '../models/categoryModel';



const add = async (req, res, next) => {
    const datos = req.body;

    try {
        const categoria = await new Categoria(datos);
        const verifyCategory = await Categoria.findOne({ categoria: datos.categoria });
        if (verifyCategory) {
            return res.status(400).json({
                msj: 'Categoria existente'
            });
        }
        await categoria.save();
        res.json(categoria);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}
const query = async (req, res, next) => {
    try {
        const reg = await Categoria.findOne({ _id: req.query._id });
        if (!reg) {
            return res.status(404).send({
                msj: 'No existe la categoria'
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
        const reg = await Categoria.find({ $or: [{ 'categoria': new RegExp(valor, 'i') }, { 'desc': new RegExp(valor, 'i') }] }, { createdAt: 0 })
            .sort({ 'createdAt': -1 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

const update = async (req, res, next) => {
    const { _id, categoria, ...resto } = req.body;
    const categoryU = await Categoria.findById(_id);
    const verifyCategory = await Categoria.findOne({ categoria });


    if (categoryU.categoria !== categoria && !verifyCategory) {
        resto.categoria = categoria;
    }

    try {
        const reg = await Categoria.findByIdAndUpdate(_id, resto, { new: true });

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
        const reg = await Categoria.findByIdAndUpdate({ _id }, { estado: 1 });
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
        const reg = await Categoria.findByIdAndUpdate({ _id }, { estado: 0 });
        res.json(reg);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}

export default {
    deactivate,
    activate,
    add,
    query,
    list,
    update
}

