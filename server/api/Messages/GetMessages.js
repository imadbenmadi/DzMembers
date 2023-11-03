const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users, Messages } = require("../../models/Db");

// router.get("/", async (req, res) => {
//     try {
//         const messages = await Messages.find().populate("Creatore", "UserName");
//         // Extract the usernames and create a simplified response
//         const simplifiedMessages = messages.map((message) => ({
//             _id: message._id,
//             title: message.title,
//             text: message.text,
//             CreatedDate: message.CreatedDate,
//             UserName: message.Creatore.UserName, // Access the username from the populated field
//         }));
//         res.json(simplifiedMessages);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch messages" });
//     }
// });
router.get("/", async (req, res) => {
    try {
        const messages = await Messages.find({}).populate('_Creatore').exec();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});
// router.get("/", async (req, res, next) => {

//         const messages = await Messages.find({});
//         let documents = [];
        
//         for (const item of messages) {
//             const creator = await Users.findOne({ _id: item.Creatore });

//             // if (creator) {
//                 const formattedDate = new Date(
//                     item.CreatedDate
//                 ).toLocaleDateString(undefined, {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                 });

//                 const FirstName = creator.FirstName;
//                 const LastName = creator.LastName;
//                 const UserName = creator.UserName;
//                 const isAdmin = creator.isAdmin;
//                 const isMember = creator.Membership;
//                 const title = item.title;
//                 const text = item.text;

//                 documents.push({
//                     FirstName,
//                     LastName,
//                     UserName,
//                     isAdmin,
//                     isMember,
//                     CreatedDate: formattedDate,
//                     title,
//                     text,
//                 });
//             // }
//         }

//         res.status(200).json(messages);

// });

module.exports = router;
