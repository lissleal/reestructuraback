import express from "express";

const ViewsRouter = express.Router()

//Rutas GET para la página de inicio y detalles del producto:

ViewsRouter.get("/inicio", async (req, res) => {
    res.render("inicio", {
        title: "App de compras",
    })
})

export default ViewsRouter