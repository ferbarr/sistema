import {Schema,model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const articleSchema=new Schema({
    categoria:{type:Schema.Types.ObjectId,ref:'Categoria',required:true},
    photo:{type:String,default:''},
    codigo:{type:String,maxlength:64},
    articulo:{type:String,unique:true,required:true},
    desc:{type:String},
    precio_venta:{type:Number,required:true},
    stock:{type:Number,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});


articleSchema.plugin(uniqueValidator);
export default model('Articulo',articleSchema);