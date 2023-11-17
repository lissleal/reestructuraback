import express from "express";
import cartModel from "../dao/mongo/cart.model.js";
import userService from "../services/UserService.js";

const productsRouter = express.Router()
const product = new userService()
const cart = new cartModel()

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