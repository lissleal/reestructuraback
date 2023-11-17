import express from "express";
import cartModel from "../dao/mongo/cart.model.js";

const CartsRouter = express.Router()
const cart = new cartModel()

CartsRouter.get("/carts/:cid", async (req, res) => {
    let cartId = req.params.cid
    let products = await cart.getProductsInCart(cartId)
    let productObjet = products.toObject()
    res.render("carts", {
        title: "Carrito",
        cart: productObjet
    })
})

export default CartsRouter