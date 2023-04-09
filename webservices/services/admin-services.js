const {User} = require('../module/user')
const {Admin} = require('../module/admin')
const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcrypt')

const addAdmin = async (name, password) => {
    const saltRounds = 10
    await Admin.sync()
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const result = await Admin.create({name: name, passwordHash: passwordHash})
    return {id: result.id, name: result.name}
}

const findAdminPasswordHashByName = async (name) => {
    await Admin.sync()
    const result = await Admin.findOne({where: {}})
    return result.passwordHash
}

const configCamPicture = (name, value) => {
    const jsonString = fs.readFileSync("./config/cam-picture.json")
    let camPictureConfig = JSON.parse(jsonString)
    camPictureConfig[name] = value
    fs.writeFileSync('./config/cam-picture.json', JSON.stringify(camPictureConfig, null, 4))
}

const configCamVideo = (name, value) => {
    const jsonString = fs.readFileSync("./config/cam-video.json")
    let camPictureConfig = JSON.parse(jsonString)
    camPictureConfig[name] = value
    fs.writeFileSync('./config/cam-video.json', JSON.stringify(camPictureConfig, null, 4))
}

const configSweetCam = (name, value) => {
    const jsonString = fs.readFileSync("./config/sweetcam.json")
    let camPictureConfig = JSON.parse(jsonString)
    camPictureConfig[name] = value
    fs.writeFileSync('./config/sweetcam.json', JSON.stringify(camPictureConfig, null, 4))
}

const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/brands')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadBrands = multer({storage: brandStorage}).single('image')

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadImages = multer({storage: imageStorage}).single('image')

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/videos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadVideos = multer({storage: videoStorage}).single('video')

// addAdmin("Jonny", "123456")

module.exports = {
    findAdminPasswordHashByName,
    configCamPicture,
    configCamVideo,
    configSweetCam,
    uploadBrands,
    uploadImages,
    uploadVideos
}