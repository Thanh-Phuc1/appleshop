const express = require("express");
const { body } = require("express-validator");
const {
  addProductToCart,
  getListProductCart,
  updateProductCart,
  deleteProductcart,
} = require("../controllers/cart.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/add",
  loginRequired,
  validate([body("productId").exists().isString().custom(checkObjectId)]),
  addProductToCart
);

router.get(
  "/",
  loginRequired,

  getListProductCart
);

module.exports = router;
