import express from "express";

const UserRouter = express.Router()

UserRouter.get("/register", (req, res) => {
    res.render("register", {
        title: "Registro de Usuario"
    })
})

UserRouter.get("/login", (req, res) => {
    res.render("login", {
        title: "Login de Usuario"
    })
})

UserRouter.get("/current", async (req, res) => {
    try {
        let user = req.session.user

        if (!user) {
            res.redirect("/login")
        }
        const userData = {
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email,
            role: user.role
        }

        res.render("current", {
            title: "Perfil de Usuario",
            user: userData
        })
    }
    catch (error) {
        console.error("Error en la ruta /current:", error);
        res.status(500).json(error);
    }
})

export default UserRouter