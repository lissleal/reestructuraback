import express from "express";
import passport from "passport";
import { registerUser, loginUser, logoutUser, handleGitHubCallback } from "../controllers/users.controller.js";

const UserRouter = express.Router()

UserRouter.post("/register",
    passport.authenticate("register",
        { failureRedirect: "/failregister" }), registerUser
)

UserRouter.get("/failregister", async (req, res) => {
    console.log("Failed Strategy")
    res.send({ error: "Failed" })
})

UserRouter.post("/login",
    passport.authenticate("login",
        { failureRedirect: "/faillogin" }), loginUser
)

UserRouter.get("/faillogin", async (req, res) => {
    res.send({ error: "Failed Login" })
})

UserRouter.get("/logout", logoutUser)

UserRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }), async (req, res) => {
    console.log("Redirecting to GitHub for authentication...")
})

UserRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), handleGitHubCallback);

UserRouter.get("/profile", async (req, res) => {
    try {
        let user = req.session.user

        if (!user || !user.email) {
            res.redirect("/login")
        }
        const userData = {
            email: user.email,
            role: user.role,
        }

        res.render("profile", {
            title: "Perfil de Usuario",
            user: userData
        })
    }
    catch (error) {
        console.error("Error en la ruta /profile:", error);
        res.status(500).json(error);
    }
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

export default UserRouter;



