const { User, Chef } = require("../models");

// Verifica si el correo existe en la colección de usuarios
const existEmailByUser = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

//Verifica si el username existe en la colección de usuarios
const existUsernameByUser = async (username = "") => {
  const existUsername = await User.findOne({ username });
  if (existUsername) {
    throw new Error(`El username: ${username}, ya está registrado`);
  }
};

//Verifica si el phone de un usuario existe en la colección de usuarios
const existPhoneByUser = async (phone = "") => {
  const existPhone = await User.findOne({ phone });
  if (existPhone) {
    throw new Error(`El phone: ${phone}, ya está registrado`);
  }
};

// Valida si el id existe en la colección de usuarios
const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

// Verifica si el correo existe en la colección de chefs
const existEmailByChef = async (email = "") => {
  const existEmail = await Chef.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

// Valida si el id existe en la colección de chefs
const existChefById = async (id) => {
  const existChef = await Chef.findById(id);
  if (!existChef) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

//Valida si el username existe en la colección de chefs
const existUsernameByChef = async (username = "") => {
  const existUsername = await Chef.findOne({ username });
  if (existUsername) {
    throw new Error(`El username: ${username}, ya está registrado`);
  }
};

//Valida si el phone de un chef existe en la colección de chefs
const existPhoneByChef = async (phone = "") => {
  const existPhone = await Chef.findOne({ phone });
  if (existPhone) {
    throw new Error(`El phone: ${phone}, ya está registrado`);
  }
};

//Valida si el kitchen_name de un chef existe en la colección de chefs
const existKitchenNameByChef = async (kitchen_name = "") => {
  const existKitchenName = await Chef.findOne({ kitchen_name });
  if (existKitchenName) {
    throw new Error(`El kitchen_name: ${kitchen_name}, ya está registrado`);
  }
};

//Valida si el nit de un chef existe en la colección de chefs
const existNitByChef = async (nit = "") => {
  const existNit = await Chef.findOne({ nit });
  if (existNit) {
    throw new Error(`El nit: ${nit}, ya está registrado`);
  }
};

module.exports = {
  existEmailByUser,
  existUserById,
  existUsernameByUser,
  existPhoneByUser,
  existEmailByChef,
  existChefById,
  existUsernameByChef,
  existPhoneByChef,
  existKitchenNameByChef,
  existNitByChef,
};
