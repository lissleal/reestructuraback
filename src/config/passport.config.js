import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import userService from "../services/UserService.js";


const LocalStrategy = local.Strategy;
const service = new userService();
const initializePassport = () => {
    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            console.log("Registering user:", req.body);
            const { name, surname, email, role } = req.body;
            try {
                let user = await service.findEmail({ email: username });
                if (user) {
                    return done(null, false, { message: "User already exists" });
                }
                const hashedPassword = await createHash(password);

                const newUser = { name, surname, email, password: hashedPassword, role };
                let result = await service.addUser(newUser);
                return done(null, result);
            } catch (error) {
                console.log("Error registering user:", error);
                return done("Error getting the user", error);
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await service.getUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await service.findEmail({ email: username });
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            const isValid = await isValidPassword(user, password);
            if (!isValid) {
                return done(null, false, { message: "Wrong password" });
            }
            console.log("Login successful. Authenticated user:", user);
            return done(null, user);
        } catch (error) {
            console.error("Error in login strategy:", error);
            return done(error);
        }
    }))

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.527e35e978c0413e",
        clientSecret: "17293d094c7fb6bdab825a12492358f8df71da1d",
        callbackURL: "http://localhost:8080/api/users/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            let name = profile.displayName;

            if (email && email.length > 0) {
                let user = await service.findEmail({ email: email });
                console.log(`User en passport.use /github: ${user}`);

                if (!user) {

                    let newUser = {
                        name: name,
                        email: email,
                        password: "",
                        role: "admin"
                    }
                    let newUserJson = JSON.stringify(newUser);

                    let result = await service.addUser(newUser);
                    return done(null, result);
                } else {
                    return done(null, user);
                }

            } else {
                return done(null, false, { message: "User not found in GitHub" });
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport;