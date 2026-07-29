const ImageKit = require("@imagekit/nodejs").default;
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadImageKit({buffer, fileName, folder = "/"}){
    try{
        const file = await client.files.upload({
            file: await toFile(Buffer.from(buffer), fileName),
            fileName: fileName,
            folder: folder,
        })
        return file
    }
    catch(error){
        throw error;
    }
}

module.exports = { uploadFile: uploadImageKit }