const logger = require('./logger')
const jwt = require('jsonwebtoken')
const jwtServices = require('../utils/jwt-services')

const pathsToBeMonitored = ["/", "/test", "/login"]
const pathsRequireUserLogin = ["/"]
const pathsRequireAdminLogin = [
    "/picture", "/video", "/rtsp/start",
    "/rtsp/stop", "/user", "/config/cam-picture",
    "/config/cam-video", "/images", "/videos"
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const authentication = (request, response, next) => {
    next()
}

const verifyToken = (request, response, next) => {
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    next(error)
}

module.exports = {
    requestLogger,
    authentication,
    verifyToken,
    unknownEndpoint,
    errorHandler
}