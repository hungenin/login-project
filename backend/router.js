require("dotenv").config();
require("./database/mongo").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("./service/auth");

const app = express();
app.use(express.json());

const User = require("./model/user");

app.post("/register", async (req, res) => {
    try {
        const { user_name, password } = req.body;

        if (!(password && user_name)) {
            return res.status(400).send("All input is required");
        }
  
        const isUserExist = await User.findOne({ user_name: user_name });  
        if (isUserExist) {
            return res.status(409).send("User Already Exist. Please Login");
        }
  
        bcrypt.hash(password, 10, async (err, hash) => {
            const newUser = await User.create({
              user_name,
              password: hash,
            });

            const userToken = jwt.sign(
                {
                    user_id: newUser._id,
                    user_name: newUser.user_name
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            const user_dto = new Object();
            user_dto.user_name = newUser.user_name;
            user_dto.token = userToken;
  
            return res.status(201).json(user_dto);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { user_name, password } = req.body;

        if (!(user_name && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ user_name: user_name });
        
        if (user) {
            bcrypt.compare(password, user.password, function(err, found) {
                if (found == true) {
                    const userToken = jwt.sign(
                        { 
                            user_id: user._id, 
                            user_name: user.user_name 
                        },
                        process.env.TOKEN_KEY,
                        { expiresIn: "2h" }
                    );
                    const user_dto = new Object();
                    user_dto.user_name = user.user_name;
                    user_dto.token = userToken;

                    return res.status(200).json(user_dto);
                } else {
                    return res.status(400).send("Wrong password...");
                }
            });
        } else {
            return res.status(400).send("User not exist");
        }
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
});

app.get("/welcome", auth, (req, res) => {
    return res.status(200).send("Welcome " + req.user.user_name + "!");
});

app.use("*", (req, res) => {
    return res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = app;