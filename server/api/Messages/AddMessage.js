const express = require("express");
const router = express.Router();
const authMidlleware = require("../authMiddleware");

const { Messages } = require("../../models/Db");
router.post("/",  async (req, res, next) => {
    let { title, text } = req.body;
    if (!title || !text) {
        return res.status(409).json({ message: "Missing Data" });
    }

    let newMessage = new Messages({
        // Creatore: req.session.id,
        title: title,
        text: text,
        CreatedDate: new Date(),
    });
    try {
        await newMessage.save();
        res.send(200);
    } catch {
        res.send(409);
    }
    
});
module.exports = router;
