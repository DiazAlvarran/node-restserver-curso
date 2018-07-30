const express = require('express');
const app = express();

const Producto = require('../models/producto');

let { verificaToken } = require('../middlewares/autenticacion');

//obtener todos los productos
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productosDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: productosDB
            });

        });

});

//obtener un producto por id
app.get('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existe el id del producto'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        });

});

//buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});

//crear un nuevo producto
app.post('/productos', verificaToken, (req, res) => {

    let body = req.body

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

//actualizar un producto por id
app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let actProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        descripcion: body.descripcion,
        disponible: body.disponible
    }

    Producto.findByIdAndUpdate(id, actProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

//eliminar un producto por id
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let eliminar = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, eliminar, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el id'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            message: 'Producto borrado'
        });

    });

});


module.exports = app;