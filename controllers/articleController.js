import Articulo from '../models/articleModel';
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dafdqsakr',
    api_key: '685822558245377',
    api_secret: '8wOm51wbK6zkRnqbj-IwuktQi5o'
});



const add = async (req, res, next) => {
    const datos = req.body;

    try {
        const articulo = await new Articulo(datos);
        const verifyArticle = await Articulo.findOne({ articulo: datos.articulo });
        if (verifyArticle) {
            return res.status(400).json({
                msj: 'Articulo existente'
            });
        }
        if (req.files) {
            const { tempFilePath } = req.files.photo;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
            articulo.photo = secure_url;
        }
        await articulo.save();
        res.json(articulo);
    } catch (e) {
        res.status(500).send({
            msj: 'Ocurrio un error'
        });
        next(e);
    }
}
const query = async (req, res, next) => {
    try {
        const reg = await Articulo.findOne({ _id: req.query._id })
        .populate('categoria',{categoria:1,_id:0});
        if (!reg) {
            return res.status(404).send({
                msj: 'No existe el articulo'
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
    let valor=req.query.valor;
    try {
        const reg=await Articulo.find({ $or: [{ 'articulo': new RegExp(valor, 'i') }, { 'desc': new RegExp(valor, 'i') }] }, { createdAt: 0 })
        .populate('categoria',{categoria:1,_id:0})
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
    const { _id, articulo, ...resto } = req.body;
    const articleU = await Articulo.findById(_id);
    const verifyArticle = await Articulo.findOne({ articulo });
    let photo=null;
    if (req.files) {
        photo = req.files.photo;
    }
    if (photo) {
        if (articleU.photo) {//Si ya tiene una foto la eliminamos
            const nombreB = articleU.photo.split('/');
            const nombre = nombreB[nombreB.length - 1];
            const [public_id] = nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = photo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        resto.photo = secure_url;
    }


    if (articleU.articulo !== articulo && !verifyArticle) {
        resto.articulo=articulo;
    } 

    try {
        const reg = await Articulo.findByIdAndUpdate(_id, resto, {new: true});

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
        const reg = await Articulo.findByIdAndUpdate({ _id }, { estado: 1 });
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
        const reg = await Articulo.findByIdAndUpdate({ _id }, { estado: 0 });
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
    query,
    list,
    update,
    activate,
    deactivate
}

