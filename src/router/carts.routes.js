import express from "express";
import ProductManager from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import UserManager from "../dao/user.dao.js";

const ViewsRouter = express.Router()
const product = new ProductManager()
const cart = new cartModel()
const user = new UserManager()

ViewsRouter.get("/carts/:cid", async (req, res) => {
    let cartId = req.params.cid
    let products = await cart.getProductsInCart(cartId)
    let productObjet = products.toObject()
    res.render("carts", {
        title: "Carrito",
        cart: productObjet
    })
})

export default ViewsRouter