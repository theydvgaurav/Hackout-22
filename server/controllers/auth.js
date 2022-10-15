require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doc = require("../models/doctor");
const Patient = require("../models/user");
const nodemailer = require("../config/nodemailer");

const registerDoc = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const newDoc = new Doc({
        Name: req.body.name,
        Email: req.body.email,
        PhoneNo: req.body.phone,
        Password: password,
    });

    newDoc
        .save()
        .then((data) => {
            const token = jwt.sign(
                {
                    id: data._id,
                    email: data.Email,
                    name: data.Name,
                },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.status(200).send({
                message: "User Created Successfully",
                id: data._id,
                token: token,
                email: data.Email,
                name: data.Name,
            });
        })
        .catch((error) => {
            return res.status(503).json({ message: error });
        });
};

const loginDoc = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(401).send({ message: "Invalid email/password" });
    }

    const user = await Doc.findOne({ Email: email });
    if (!user) {
        return res.status(401).send({ message: "Invalid email/password" });
    }

    if (await bcrypt.compare(password, user.Password)) {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.Email,
                name: user.Name,
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).send({
            message: "User LoggedIn Successfully",
            id: user._id,
            token: token,
            email: user.Email,
            name: user.Name,
        });
    }
    res.status(401).send({ message: "Invalid email/password" });
};

const loginPatientByMagicLink = async (req, res) => {
    try {
        const user = await Patient.findOne({
            MagicLink: req.params.token,
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        if (user.MagicLinkExpired) {
            return res.status(401).send({ message: "Magic Link Expired." });
        }

        user.MagicLinkExpired = true;
        await user.save();
        const token = jwt.sign(
            {
                id: user.id,
                email: user.Email,
                name: user.Name,
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).send({
            message: "User LoggedIn Successfully",
            id: user.id,
            token: token,
            email: user.Email,
            name: user.Name,
        });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

module.exports = { registerDoc, loginDoc, loginPatientByMagicLink };
