import {Schema,model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema=new Schema({
    name:{type:String,required:[true,'Nombre obligatorio']},
    photo:{type:String,default:''},
    rol:{type:String,required:[true,'Rol obligatorio']},
    direccion: { type: String,default:'' },
    tel: { type: String,default:'' },
    user: { type: String, required: [true,'Usuario obligatorio'], unique: true },
    password: { type: String, required: [true,'Contraseña obligatoria'],minlength:[6,'Minimo 6 letras'] },
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }

});

userSchema.plugin(uniqueValidator);


userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
}
export default model('Usuario',userSchema);