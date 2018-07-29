/*========================================
/*===============PUERTO===================
==========================================*/

process.env.PORT = process.env.PORT || 3000;


/*========================================
/*===============ENTORNO==================
==========================================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



/*========================================
/*=========vencimiento de token===========
==========================================*/
// segundos * minutos * horas * días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/*========================================
/*=========seed de autenticación==========
==========================================*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/*========================================
/*===============Base de datos============
==========================================*/

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI; //MONGO_URI es variable de entorno de heroku. Tiene el enlace a la bd en nube
}

process.env.URLDB = urlDB;


/*========================================
/*===============Google Client Id=========
==========================================*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '749284339469-j5e30cdmh0qi77gjgotbsg28q22vtti0.apps.googleusercontent.com';