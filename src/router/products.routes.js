import express from "express";
import ProductManager from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import UserManager from "../dao/user.dao.js";

const productsRouter = express.Router()
const product = new ProductManager()
const cart = new cartModel()
const user = new UserManager()

productsRouter.get("/products", async (req, res) => {
    if (!req.session.email) {
        res.redirect("/login")
    }

    let allProducts = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON())
    const userData = {
        name: req.session.name,
        surname: req.session.surname,
        email: req.session.email,
        role: req.session.role
    }

    res.render("home", {
        title: "Segunda Pre Entrega",
        products: allProducts,
        user: userData

    })
})

productsRouter.get("/products/:id", async (req, res) => {

    let productId = req.params.id
    let prod = await product.getProductById(productId)

    const productDetail = prod.toObject();

    res.render("prod", {
        title: "Detalle de Producto",
        product: productDetail
    })
})

export default productsRouter;