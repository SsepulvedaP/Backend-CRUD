const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
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
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  level: {
    type: String,
  },
  points: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  orders: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
      price: String,
      rating: String,
      status: String,
      chef: {
        type: Schema.Types.ObjectId,
        ref: "Chef",
      },
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
