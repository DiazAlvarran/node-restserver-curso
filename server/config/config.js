/*========================================
/*===============PUERTO===================
==========================================*/

process.env.PORT = process.env.PORT || 3000;


/*========================================
/*===============ENTORNO==================
==========================================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*========================================
/*===============Base de datos============
==========================================*/

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:cafeuser123@ds253871.mlab.com:53871/cafenodejs';
}

process.env.URLDB = urlDB;