import  dbConnection  from '../database/config';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';
import routes from '../routes';


class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.conecctDB();
        this.middlewares();
        this.routes();
    }
    async conecctDB(){
         await dbConnection();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static(path.join(__dirname,'public')));
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/'
        }));
    }

    routes(){
       this.app.use('/sistema',routes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando el puerto ${this.port}`);
        })
    }

}

export default Server;