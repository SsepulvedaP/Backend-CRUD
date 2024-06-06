const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user"); //Importa el modelo User
const Chef = require("../models/chef"); // Importa el modelo Chef

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const [user, chef] = await Promise.all([
      User.findById(uid),
      Chef.findById(uid),
    ]);

    // Verificar si el token-uid existe
    if (!user && !chef) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    // Verificar si el estado del chef (uid) está borrado (false)
    if (chef != null) {
      // Si el chef está activo
      if (!chef.state)
        return res.status(401).json({
          msg: "Token no válido - Chef con estado false",
        });

      req.chef = chef;
    }

    // Verificar si el estado del usuario (uid) está borrado (false)
    if (user != null) {
      // Si el usuario está activo
      if (!user.state)
        return res.status(401).json({
          msg: "Token no válido - User con estado false",
        });

      req.user = user;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
