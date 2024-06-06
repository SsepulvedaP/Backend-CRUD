const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generateJWT } = require("../helpers/generate-jwt");
const { User, Chef } = require("../models");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const [user, chef] = await Promise.all([
      User.findOne({ email }),
      Chef.findOne({ email }),
    ]);

    // Verificar si el email existe tanto para un usuario como para un chef
    if (!user && !chef) {
      return res.status(400).json({
        msg: "El correo no existe",
      });
    }

    // Autentificación de los Usuarios
    if (user != null) {
      // Verifica sí el usuario está activo
      if (!user.state)
        return res.status(400).json({
          msg: "El correo no se encuentra",
        });

      // Si el pwd es correcto
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword)
        return res.status(400).json({
          msg: "La contraseña no es correcta",
        });

      // Generar el JWT
      const token = await generateJWT(user.id);

      res.json({
        user,
        token,
      });
    }

    // Autentificación de los Chefs
    if (chef != null) {
      // Verifica sí el chef está activo
      if (!chef.state)
        return res.status(400).json({
          msg: "El correo no se encuentra",
        });

      // Si el pwd es correcto
      const validPassword = bcryptjs.compareSync(password, chef.password);
      if (!validPassword)
        return res.status(400).json({
          msg: "La contraseña no es correcta",
        });

      // Generar el JWT
      const token = await generateJWT(chef.id);

      res.json({
        chef,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const validateToken = async (req, res = response) => {
  // Valida el JWT
  if (req.user) {
    const token = req.header("x-token");
    res.json({
      user: req.user,
      token: token,
    });
  }

  if (req.chef) {
    const token = req.header("x-token");
    res.json({
      chef: req.chef,
      token: token,
    });
  }
};

module.exports = {
  login,
  validateToken,
};
