import {Schema,model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const personSchema=new Schema({
    tipo_persona:{type:String,required:[true,'Campo obligatorio']},
    name:{type:String,required:[true,'Campo nombre obligatorio']},
    direccion:{type:String,default:''},
    tel:{type:String,default:''},
    email:{type:String,default:''},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}

});


export default model('Persona',personSchema);