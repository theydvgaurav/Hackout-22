require("dotenv").config();
const Prescription = require("../models/prescription");
const Patient = require("../models/user");
const Doc = require("../models/doctor");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");
const fs = require("fs");

const createPrescription = async (req, res) => {
    // todo file upload to R2 Bucket and generate presigned url
    const files = req.files;
    console.log(files) ;

    const attachments_path =  [] ;
    const media_dir = process.env.MEDIA_DIR
    for (const file of files){
        fileData = file.data ;
        fileType = file.mimetype ;
        fileName = file.name ;
        filePath = media_dir + "/" + fileName ;

        // save the file by writing all the data into it
        fs.writeFile(filePath, fileData, (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File saved successfully.\n");
            }
        });

    }

    const token = jwt.sign(
        {
            email: req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET
    );

    let PatientId;

    const existingUser = await Patient.findOne({ Email: req.body.email });

    if (existingUser) PatientId = existingUser.id;

    if (!existingUser) {
        const newUser = await Patient.create({
            Email: req.body.email,
            MagicLink: token,
        });
        PatientId = newUser.id;
    }

    const newPresc = new Prescription({
        PatientId: PatientId,
        DoctorId: req.doc.id,
        PresignedUrl: "",
        PatientName: req.body.name,
        Description: req.body.description,
    });

    // todo send email to patient

    newPresc
        .save()
        .then((data) => {
            res.status(200).send({ message: "Documents Sent Successfully" });
        })
        .catch((error) => {
            return res.status(503).json({ message: error });
        });
};

const getAllPresc = async (req, res) => {
    try {
        const allDocs = await Prescription.find({ PatientId: req.user.id }).distinct(
            "DoctorId"
        );
        const docDetails = await Doc.find()
            .where("_id")
            .in(allDocs)
            .select("Name Email Phone Email");
        res.status(200).send({ data: docDetails });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

module.exports = { createPrescription, getAllPresc };
