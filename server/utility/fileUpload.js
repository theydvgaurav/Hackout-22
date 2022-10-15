var AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    signatureVersion: 'v4'
});


let s3 = new AWS.S3({
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    region: "auto",
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
});

const getLastItem = filePath => filePath.substring(filePath.lastIndexOf('/') + 1);


const uploadFile = (filePath, contentType, userId) => {
    try {
        const fileName = getLastItem(filePath);
        keyName = userId + '/' + fileName;
        fileData = fs.readFileSync(filePath);

        s3.putObject({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: keyName,
            Body: fileData,
            "ContentType": contentType
        })
        return keyName;

    } catch (error) {
        return error
    }
}

module.exports = { uploadFile }