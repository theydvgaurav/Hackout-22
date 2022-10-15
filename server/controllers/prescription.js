require("dotenv").config();
const Prescription = require("../models/prescription");
const Patient = require("../models/user");
const Doc = require("../models/doctor");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");
const fs = require("fs");

const uploadFile = require('../utility/fileUpload').uploadFile
const getpresignedURL = require('../utility/presignedUrl').getPresignedUrl

const createPrescription = async (req, res) => {
    // todo file upload to R2 Bucket and generate presigned url

    const token = jwt.sign(
        {
            email: req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET
    );

    let PatientId;

    const existingUser = await Patient.findOne({ Email: req.body.email });



    if (existingUser) {
        PatientId = existingUser.id;
        existingUser.MagicLink = token;
        await existingUser.save();
    }


    if (!existingUser) {
        const newUser = await Patient.create({
            Email: req.body.email,
            MagicLink: token,
        });
        PatientId = newUser.id;
    }

    // console.log('starting uploading files');

    // upload all the attachments provided by the doctor
    const files = req.files.files;
    // console.log(Object.keys(files)[0], " Keys ");
    // console.log(typeof (files));

    const attachments_path = [];
    const media_dir = process.env.MEDIA_DIR
    if (Object.keys(files)[0] === 'name') {
        fileData = files.data;
        fileType = files.mimetype;
        fileName = files.name;
        filePath = media_dir + "/" + fileName;

        // save the file by writing all the data into it
        fs.writeFileSync(filePath, fileData, (err) => {
            if (err) {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return res.status(500).send({ message: err });
            }
            else {
                // console.log("File saved successfully.\n");
            }
        });

        // upload the file to R2 Bucket
        const upload_resp = uploadFile(filePath, fileType, PatientId);
        // remove the file from the system
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (upload_resp.status == 1) {
            // console.log('file uploaded successfully.\n');
            attachments_path.push(upload_resp.data);
        }
        else {
            // console.log('file failed to upload.\n');
            return res.status(500).send({ message: upload_resp.error });
        }

    }
    else {
        for (const file of files) {
            fileData = file.data;
            fileType = file.mimetype;
            fileName = file.name;
            filePath = media_dir + "/" + fileName;

            // save the file by writing all the data into it
            fs.writeFileSync(filePath, fileData, (err) => {
                if (err) {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                    return res.status(500).send({ message: err });
                }
                else {
                    // console.log("File saved successfully.\n");
                }
            });

            // upload the file to R2 Bucket
            const upload_resp = uploadFile(filePath, fileType, PatientId);
            // remove the file from the system
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            if (upload_resp.status == 1) {
                // console.log('file uploaded successfully.\n');
                attachments_path.push(upload_resp.data);
            }
            else {
                // console.log('file failed to upload.\n');
                return res.status(500).send({ message: upload_resp.error });
            }

        }
    }

    const presignedUrls = [];

    for (const path of attachments_path) {
        // upload the file to R2 Bucket
        const url_generate_resp = getpresignedURL(path);

        if (url_generate_resp.status == 1) {
            // console.log('Presigned Url generated successfully.\n');
            // console.log(url_generate_resp.data);
            presignedUrls.push(url_generate_resp.data);
        }
        else {
            // console.log('Failed to generate Presigned Url.\n');
            return res.status(500).send({ message: url_generate_resp.error });
        }
    }

    const newPresc = new Prescription({
        PatientId: PatientId,
        DoctorId: req.doc.id,
        presignedURL: presignedUrls,
        PatientName: req.body.name,
        Description: req.body.description,
    });
    // todo send email to patient

    newPresc
        .save()
        .then((data) => {
            nodemailer.sendEmail(req.doc.Name, req.body.email, token)
            res.status(200).send({ message: "Documents Sent Successfully" });
        })
        .catch((error) => {
            return res.status(503).json({ message: error });
        });
};

const getAllPrescForPatient = async (req, res) => {
    try {
        const allPresc = await Prescription.find({ PatientId: req.user.id }).select("-PatientId").populate("DoctorId", "-Password -IsActive -__v -Email -PhoneNo")
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
        const allPresc = await Prescription.find({ DoctorId: req.doc.id }).select("-DoctorId").populate("PatientId", "-MagicLink -IsActive -MagicLinkExpired -Password -__v")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        // console.log(error)
        return res.status(503).json({ message: error });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const AllPatients = await Prescription.find({ DoctorId: req.doc.id }).distinct(
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
        const allPresc = await Prescription.find({ PatientId: req.user.id, DoctorId: req.params.doctorId }).select("-PatientId").populate("DoctorId", "-Password -IsActive -__v -Email -PhoneNo")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
}

const getPrecsByPatId = async (req, res) => {
    try {
        const allPresc = await Prescription.find({ PatientId: req.params.patientId, DoctorId: req.doc.id }).select("-DoctorId").populate("PatientId", "-MagicLink -IsActive -MagicLinkExpired -Password -__v")
        res.status(200).send({ data: allPresc });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
}




module.exports = { createPrescription, getAllPrescForPatient, getAllDocs, getAllPrescForDoc, getAllPatients, getPrecsByDocId, getPrecsByPatId };
