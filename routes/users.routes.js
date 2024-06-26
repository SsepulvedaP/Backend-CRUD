const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  usersGet,
  userGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/users.controller");
const {
  existUserById,
  existUsernameByUser,
  existPhoneByUser,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
  ],
  userGet
);

router.post(
  "/",
  [
    check("username", "El username es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("username").custom(existUsernameByUser),
    check("phone").custom(existPhoneByUser),
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  usersDelete
);

module.exports = { router };
