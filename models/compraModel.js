import {Schema,model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const compraSchema=new Schema({
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario',required:true},
    persona:{type:Schema.Types.ObjectId,ref:'Persona',required:true},
    tipo_comprobante:{type:String,required:true},
    num_comprobante:{type:String,required:true,unique:true},
    impuesto:{type:Number,required:true},
    total:{type:String,required:true},
    detalles:[
        {
            _id:{type:String,required:true},
            articulo:{type:String,required:true},
            cantidad:{type:Number,required:true},
            precio:{type:Number,required:true}
        }
    ],
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

compraSchema.plugin(uniqueValidator);

export default model('Compra',compraSchema);