const { response } = require("express");
const bcryptjs = require("bcryptjs")

const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../models");

const login = async (req, res = response) => {

    const  { email, password } = req.body;

    try {

        const user = await User.findOne({ email })
        
        // Verificar si el email existe
        if (!user) {
            return res.status(400).json({
                msg: 'El correo no existe'
            });
        }


        // Autentificación de los Usuarios
        if ( user != null ) {

            // Verifica sí el usuario está activo
            if ( !user.state )
                return res.status(400).json({
                    msg: 'El correo no se encuentra'
            });

            // Si el pwd es correcto
            const validPassword = bcryptjs.compareSync( password, user.password )
            if ( !validPassword )
            return res.status(400).json({
                msg: 'La contraseña no es correcta'
            });

            // Generar el JWT
            const token = await generateJWT( user.id )

            res.json({ 
                user,
                token
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            msg: 'Hable con el administrador'
        })
    }
}

const validateToken = async (req, res = response ) => {

    // Valida el JWT
    if( req.user ){
        
        const token = req.header('x-token');
        res.json({
            user: req.user,
            token: token,
        })
    }

}

module.exports = {
    login,
    validateToken
}