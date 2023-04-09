const logger = require('./logger')
const jwt = require('jsonwebtoken')

const pathsToBeMonitored = ["/", "/test", "/login"]
const pathsRequireUserLogin = ["/"]
const pathsRequireAdminLogin = [
    "/picture", "/video", "/rtsp/start",
    "/rtsp/stop", "/user", "/config/cam-picture",
    "/config/cam-video", "/images", "/videos"
]

const requestLogger = (req, res, next) => {
    /* Check whether the request should be monitored */
    if (pathsToBeMonitored.includes(req.path)) {
        const log = {
            message: `request ${req.path}`,
            method: req.method,
            body: req.body,
            ip: req.socket.remoteAddress
        }
        logger.info(log);
    }
    next()
}

const authentication = (req, res, next) => {
    if (pathsRequireUserLogin.includes(req.path) && req.session.username === undefined) {
        return res.redirect("/login")
    }
    next()
}

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const verifyToken = (req, res, next) => {
    if (pathsRequireAdminLogin.includes(req.path)) {
        const decodedToken = jwt.verify(getTokenFrom(req), "test")
        if (!decodedToken.username) {
            return res.status(401).json({ error: 'token invalid' })
        }
    }
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

module.exports = {requestLogger, authentication, verifyToken, unknownEndpoint, errorHandler}