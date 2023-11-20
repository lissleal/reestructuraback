import express from "express";
import { createProduct, deleteProduct, getProductById, getProductByLimit, getProductByPage, getProductByQuery, getProductMaster, updateProduct } from "../controllers/products.controller.js";

const productsRouter = express.Router()


productsRouter.get("/", getProductMaster)
productsRouter.get("/:pid", getProductById)
productsRouter.post("/", createProduct)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", deleteProduct)
productsRouter.get("/limit/:limit", getProductByLimit)
productsRouter.get("/page/:page", getProductByPage)
productsRouter.get("/query/:query", getProductByQuery)

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