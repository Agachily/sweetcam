const fs = require('fs')
const userServices = require("./user-services");
const bcrypt = require("bcrypt");

const getCamPictureConfig = () => {
    const jsonString = fs.readFileSync("./config/cam-picture.json");
    return JSON.parse(jsonString);
}

const getCamVideoConfig = () => {
    const jsonString = fs.readFileSync("./config/cam-video.json");
    return JSON.parse(jsonString);
}

const getBrandConfig = () => {
    const jsonString = fs.readFileSync("./config/brand.json");
    return JSON.parse(jsonString);
}

const getMedium = () => {
    const jsonString = fs.readFileSync("./config/sweetcam.json");
    return JSON.parse(jsonString).medium;
}

const getLoginLimit = () => {
    const jsonString = fs.readFileSync("./config/sweetcam.json");
    return JSON.parse(jsonString).loginLimit;
}

module.exports = { getCamPictureConfig, getCamVideoConfig, getBrandConfig, getMedium, getLoginLimit}
