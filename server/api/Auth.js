const express = require("express");
const router = express.Router();

const { Users } = require("../models/Db");

router.post("/Sign_up", async (req, res) => {
    const { FirstName, LastName, UserName, Email, Password } = req.body;
    if (!FirstName || !LastName || !UserName || !Email || !Password) {
        return res.status(409).json({ message: "Missing Data" });
    }
    const existingUser = await Users.findOne({ UserName: UserName });
    if (existingUser) {
        res.sendStatus(400);
        // .json({ error: "Username already exists" });
    } else {
        const newUser = new Users({
            FirstName: FirstName,
            LastName: LastName,
            UserName: UserName,
            Email: Email,
            Password: Password,
        });
        try {
            await newUser.save();
            res.sendStatus(200);
            // .json({ message: "Account Created Successfully" });
        } catch (err) {
            res.sendStatus(400);
        }
    }
});

router.post("/Login", async (req, res, next) => {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
        return res.status(409).json({ message: "Missing Data" });
    }
    const user = await Users.findOne({ UserName: UserName });
    if (user && user.Password === Password) {
        req.session.userId = user._id;
        res.sendStatus(200);
        console.log(req.session);
    } else {
        res.sendStatus(409);
        console.log("Username or Password isn't correct");
    }
});
router.post("/logout", async (req, res, next) => {
    req.session = null;
    res.sendStatus(200).json({ message: "Logged out successfully" });
});
module.exports.isAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: "Not Authenticated" });
    }
};

module.exports = router;
