const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const upload = multer();
const stream = require('stream');

const storage = new Storage({keyFilename: './atslivo-d315eca97918.json'});

const bucket_name = 'livopath'

const myBucket = storage.bucket(bucket_name);

async function upload_file(prefix, identifier, file_name, file_stream){
    // Prefix + identifier -> directory of storage
    // file_name -> name of the file
    let destFileName = "" + prefix+"_"+identifier+"/"+file_name;
    const file = myBucket.file(destFileName);
    
    const passthroughStream = new stream.PassThrough();
    passthroughStream.write(file_stream);
    passthroughStream.end();
    try {
        passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
        // File upload completed
        });

        console.log("File uploaded successfully");
        return true;
    } catch (err) {
        console.log("Something went wrong: file upload");
        return false;
    }
}

async function delete_single_file(prefix, identifier, file_name, gen_num){
    // Prefix + identifier -> directory of storage
    // file_name -> name of the file
    let destFileName = "" + prefix+"_"+identifier+"/"+file_name;
    const deleteOptions = {
        ifGenerationMatch: gen_num,
    };
    try {
        await myBucket.file(destFileName).delete(deleteOptions);
        console.log("File deleted") 
        return true   
    } catch (err) {
        console.log(err)
        console.log("Something went wrong: file deletion")
        return false
    }
}

async function get_file_list(pref, identifier){
    let prefix = ""+pref+"_"+identifier+"/";
    const options = {
        prefix: prefix,
        delimiter: '/',
    };
    try{
        const [files] = await myBucket.getFiles(options);
        return files;
    } catch (err) {
        console.log("Something went wrong: files retrieval")
        return false
    }
    
}

async function get_signed_URL(filename){
    let destFileName = ""+filename;
    const options = {
        version: 'v2', // defaults to 'v2' if missing.
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // one hour
    };
    try {
        const [url] = await myBucket.file(destFileName).getSignedUrl(options);
        return url
    } catch (err) {
        console.log("Something went wrong: get signed URL")
        return false
    }
}

module.exports = {upload_file, delete_single_file, get_file_list, get_signed_URL}