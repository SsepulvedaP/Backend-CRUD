const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  chefsGet,
  chefGet,
  chefsPut,
  chefsPost,
  chefsDelete,
} = require("../controllers/chefs.controller");
const {
  existChefById,
  existEmailByChef,
  existUsernameByChef,
  existPhoneByChef,
  existKitchenNameByChef,
  existNitByChef,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", chefsGet);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existChefById),
    validateFields,
  ],
  chefGet
);

router.post(
  "/",
  [
    check("email").custom(existEmailByChef),
    check("username").custom(existUsernameByChef),
    check("kitchen_name").custom(existKitchenNameByChef),
    check("phone").custom(existPhoneByChef),
    check("nit").custom(existNitByChef),
    validateFields,
  ],
  chefsPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existChefById),
    validateFields,
  ],
  chefsPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existChefById),
    validateFields,
  ],
  chefsDelete
);

module.exports = { router };
