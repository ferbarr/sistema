import mongoose from 'mongoose';

const dbConnection=async()=>{
    mongoose.Promise=global.Promise;
    const dbUrl='mongodb://localhost:27017/dbVentas';
    mongoose.connect(dbUrl,{useNewUrlParser:true}).
    then(mongoose=>console.log('Conectado a la DB')).
    catch(e=>console.log(e));
}

export default dbConnection;