const { Schema, model } = require("mongoose");

const ChefSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: false,
  },
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
  },
  kitchen_name: {
    type: String,
    required: [true, "El nombre de la cocina es obligatorio"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "El teléfono es obligatorio"],
    unique: false,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    unique: false,
  },
  nit: {
    type: String,
    required: [true, "El NIT es obligatorio"],
    unique: true,
  },
  residence_certificate: {
    type: Object,
    required: false,
  },
  food_certificate: {
    type: Object,
    required: false,
  },
  my_history: {
    type: String,
    required: false,
  },
  kitchen_description: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  state: {
    type: Boolean,
    default: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

ChefSchema.methods.toJSON = function () {
  const { __v, password, _id, ...chef } = this.toObject();
  chef.uid = _id;
  return chef;
};

module.exports = model("Chef", ChefSchema);
