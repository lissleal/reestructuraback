
export async function registerUser(req, res) {
    try {
        console.log("Registering user...");
        const { name, surname, email, password, role } = req.body;
        if (!name || !surname || !email || !password || !role) {
            console.log("Faltan datos");
            res.status(400).send("Faltan datos");
        }
        res.redirect("/login");
    } catch (error) { res.status(500).send("Error al registrar usuario: " + error.message); }

}

export async function loginUser(req, res) {
    try {
        let user = req.user
        if (user.role === "admin") {
            req.session.email = user.email
            req.session.role = user.role
            req.session.name = user.name
            req.session.surname = user.surname
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/profile")
        } else {
            req.session.email = user.email
            req.session.role = user.role
            req.session.name = user.name
            req.session.surname = user.surname
            req.session.age = user.age;
            req.session.user = user;
            res.redirect("/products")
        }
        console.log("Session established:", req.session.user);

    } catch (error) {
        res.status(500).json("Usuario o contraseña incorrectos")
    }
}

export async function logoutUser(req, res) {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function handleGitHubCallback(req, res) {
    try {
        req.session.user = req.user;
        req.session.email = req.user.email;
        req.session.role = req.user.role;

        res.redirect("/profile");
    } catch (error) {
        res.status(500).json("Error during GitHub authentication");
    }
}


