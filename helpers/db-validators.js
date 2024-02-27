const { User } = require('../models')

const existEmailByUser = async( email = '') => {

    // Verifica si el correo existe
    const existEmail = await User.findOne({ email })
    if ( existEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`)
    }
}

const existUserById = async ( id ) => {

    // Valida si el id existe en la DB
    const existUser = await User.findById(id)
    if ( !existUser ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}

module.exports = {
    existEmailByUser,
    existUserById,
}