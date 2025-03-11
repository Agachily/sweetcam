const app = require('./app')

const PORT = process.env.NODE_DOCKER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})