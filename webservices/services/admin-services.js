const {User} = require('../model/user')
const {Admin} = require('../model/admin')
const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcrypt')

const getNumberOfAdmins = async () => {
    const number = await Admin.count()
    console.log(number)
    return number
}

const addAdmin = async (name, password, chatId) => {
    const saltRounds = 10
    await Admin.sync()
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const result = await Admin.create({name: name, passwordHash: passwordHash, chatId: chatId})
    return result.id
}

const updatePassword = async (id, password) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const result = await Admin.update({passwordHash: passwordHash}, {
        where: {
            id: id
        }
    })
}

const findAdminCredentialsByName = async (name) => {
    await Admin.sync()
    const result = await Admin.findOne({where: {}})
    return {name: result.name, id: result.id, passwordHash: result.passwordHash}
}

const findChatIdByName = async (name) => {
    await Admin.sync()
    const result = await Admin.findOne({where: {}})
    return result.chatId
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

module.exports = {
    getNumberOfAdmins,
    addAdmin,
    findAdminCredentialsByName,
    findChatIdByName,
    configCamPicture,
    configCamVideo,
    configSweetCam,
    updatePassword,
    uploadBrands,
    uploadImages,
    uploadVideos
}