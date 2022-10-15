var R2 = require('cloudflare-r2')
global.fetch = require('node-fetch')
const fs = require('fs') ;



var r2 = new R2(
                {
                    accessKey: process.env.R2_ACCESS_KEY,
                    secretKey: process.env.R2_SECRET_ACCESS_KEY,
                    accountId: process.env.R2_ACCOUNT_ID,
                    region: 'auto'
                }
            );



(async function() {
    try {

        let bucket = process.env.R2_BUCKET_NAME ;
        let file_path = 'a/test/file.txt';
        let body = 'test file contents'; 

        try {
            const data = fs.readFileSync(file_path, 'utf8');
            body = data ;
            console.log(data);
        } catch (err) {
            console.error(err);
        }

        let key = 'repository of r2 bucket.'
        let putResponse = await r2.putObject({bucket, key, body})

        console.log(`put status: ${putResponse.status}`)
        console.log(`put response body: '${await putResponse.text()}'`)
    }
    catch (ex) {
        console.log(ex)
    }
}());