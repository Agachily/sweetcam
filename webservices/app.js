require('dotenv').config()
const express = require('express')
const path = require('path')
const sessions = require('express-session')
const cookieParser = require("cookie-parser")
const mysql = require('mysql2')
const bcrypt = require('bcrypt')

const app = express()

// Session configuration
const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

// Middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// View engine setup
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql_service',
    user: process.env.DB_USER || 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.DB_NAME || 'honeydb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err)
        return
    }
    console.log('Connected to MySQL database')
})

// Routes
app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.render('login')
    }
    res.redirect('/dashboard')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username); // Debug log
    
    db.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.render('login', { error: 'Database error' });
        }
        
        if (results.length === 0) {
            console.log('User not found:', username); // Debug log
            return res.render('login', { error: 'Invalid credentials' });
        }

        const user = results[0];
        console.log('Found user:', user.name); // Debug log
        
        try {
            const match = await bcrypt.compare(password, user.passwordHash);
            console.log('Password match:', match); // Debug log
            
            if (!match) {
                return res.render('login', { error: 'Invalid credentials' });
            }

            req.session.user = { id: user.id, name: user.name };
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Password comparison error:', error);
            res.render('login', { error: 'Authentication error' });
        }
    });
})

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }

    // Fetch honeypot data
    db.query('SELECT * FROM honeypot_logs ORDER BY timestamp DESC LIMIT 10', (err, logs) => {
        if (err) {
            console.error('Database error:', err)
            return res.render('dashboard', { error: 'Could not fetch logs' })
        }
        res.render('dashboard', { logs: logs || [] })
    })
})

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('error', { error: 'Something broke!' })
})

module.exports = app