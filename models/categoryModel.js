import {Schema,model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const categorySchema=new Schema({
    categoria:{type:String,required:[true,'Categoria obligatorio'],unique:true},
    desc:{type:String,default:''},
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }

});

categorySchema.plugin(uniqueValidator);


export default model('Categoria',categorySchema);