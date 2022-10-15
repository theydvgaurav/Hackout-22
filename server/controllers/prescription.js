require("dotenv").config();
const Prescription = require("../models/prescription");
const Patient = require("../models/user");
const Doc = require("../models/doctor");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");
const fs = require("fs");

const uploadFile = require('../utility/fileUpload')
const presignedURL = require('../utility/presignedUrl')

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

const getAllPrescForPatient = async (req, res) => {
    try {
        const allPresc = await Presc.find({ PatientId: req.user.id }).select("-PatientId").populate("DoctorId", "-Password -IsActive -__v -Email -PhoneNo")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

const getAllDocs = async (req, res) => {
    try {
        const allDocs = await Prescription.find({ PatientId: req.user.id }).distinct(
            "DoctorId"
        );
        const docDetails = await Doc.find()
            .where("_id")
            .in(allDocs)
            .select("Name Email");
        res.status(200).send({ data: docDetails });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

const getAllPrescForDoc = async (req, res) => {
    try {
        const allPresc = await Presc.find({ DoctorId: req.doc.id }).select("-DoctorId").populate("PatientId", "-MagicLink -IsActive -MagicLinkExpired -Password -__v")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        console.log(error)
        return res.status(503).json({ message: error });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const AllPatients = await Presc.find({ DoctorId: req.doc.id }).distinct(
            "PatientId"
        );
        const patDetails = await Patient.find()
            .where("_id")
            .in(AllPatients)
            .select("Name Email");
        res.status(200).send({ data: patDetails });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

const getPrecsByDocId = async (req, res) => {
    try {
        const allPresc = await Presc.find({ PatientId: req.user.id, DoctorId: req.params.doctorId }).select("-PatientId").populate("DoctorId", "-Password -IsActive -__v -Email -PhoneNo")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
}

const getPrecsByPatId = async (req, res) => {
    try {
        const allPresc = await Presc.find({ PatientId: req.params.patientId, DoctorId: req.doc.id }).select("-DoctorId").populate("PatientId", "-MagicLink -IsActive -MagicLinkExpired -Password -__v")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
}




module.exports = { createPrescription, getAllPrescForPatient, getAllDocs, getAllPrescForDoc, getAllPatients, getPrecsByDocId, getPrecsByPatId };
