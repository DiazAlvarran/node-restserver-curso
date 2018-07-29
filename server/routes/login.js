const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => { //busco usuario por email

        if (err) { // si hay error en la consulta
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) { // si el usuario no existe
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) { //si la contraseña no corresponde con el usuario

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });

        }

        let token = jwt.sign({ //crear token con expiración de 30 días
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({ //si el email y el password coinciden
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});


module.exports = app;