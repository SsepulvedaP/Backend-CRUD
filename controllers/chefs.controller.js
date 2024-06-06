const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Chef = require("../models/chef");
const { generateJWT } = require("../helpers");

const chefsGet = async (req, res = response) => {
  try {
    const [total, chefs] = await Promise.all([
      Chef.countDocuments({ state: true }),
      Chef.find({ state: true }),
    ]);

    res.json({
      total,
      chefs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ocurrió un error inesperado. Por favor, intente nuevamente.",
    });
  }
};

const chefGet = async (req, res = response) => {
  const { id } = req.params;

  try {
    const chef = await Chef.findById(id);

    if (!chef) {
      return res.status(404).json({
        msg: "Chef no encontrado",
      });
    }

    res.json(chef);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ocurrió un error inesperado. Por favor, intente nuevamente.",
    });
  }
};

const chefsPost = async (req, res = response) => {
  var { name, username, kitchen_name, email, phone, password, ...rest } =
    req.body;

  try {
    const chefDB = await Chef.findOne({ email: email, state: true });

    if (chefDB) {
      return res.status(400).json({
        msg: `El correo ${chefDB.email}, ya existe`,
      });
    }

    const chef = new Chef({
      name,
      username,
      kitchen_name,
      email,
      phone,
      password,
      ...rest,
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    chef.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await chef.save();

    res.status(202).json({
      chef,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ocurrió un error inesperado. Por favor, intente nuevamente.",
    });
  }
};

const chefsPut = async (req, res = response) => {
  const { id } = req.params;
  let { _id, password, email, ...rest } = req.body;

  try {
    if (email) {
      const chefDB = await Chef.findOne({ email: email, state: true });

      if (chefDB._id.toString() !== id) {
        return res.status(400).json({
          msg: `El correo ${chefDB.email}, ya existe`,
        });
      } else {
        rest.email = email;
      }
    }

    const chef = await Chef.findByIdAndUpdate(id, rest);

    if (!chef) {
      return res.status(404).json({
        msg: "Chef no encontrado",
      });
    }
    res.json(chef);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ocurrió un error inesperado al actualizar el chef. Por favor, intente nuevamente.",
    });
  }
};

const chefsDelete = async (req, res = response) => {
  const { id } = req.params;

  const chef = await Chef.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "Se ha eliminado el chef",
    chef,
  });
};

module.exports = {
  chefsGet,
  chefGet,
  chefsPut,
  chefsPost,
  chefsDelete,
};
