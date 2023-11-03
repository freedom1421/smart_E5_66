const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
const multer = require('multer');
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing

// Import your User model and authentication functions from "auth"
const { register, login } = require('auth');
const { count } = require('console');

// Initialize the database connection
const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'iote1-5-2566',
    supportBigNumber: true,
    timezone: '+7:00',
    dateStrings: true,
    charset: 'utf8mb4_unicode_ci',
  },
});

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/photos');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Handle file uploads
app.post('/stats', upload.single('file'), function (req, res) {
  // req.file is the uploaded file, and req.body holds the text fields
  console.log('Uploaded file:', req.file);
  console.log('Form data:', req.body);
});


// User login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database.
  const getUserinfo = await db('member').select('username', 'password').where('username', username);
  if (!getUserinfo[0]) {
    res.status(404).json({
      code: "error",
      message: "User not found"
    });
    return;
  }

  // Check if the password is correct.
  if (getUserinfo[0].password !== password) {
    res.status(401).json({
      code: "error",
      message: "Incorrect password"
    });
    return;
  }

  // Generate a token.
  // const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

  // Send the token back to the client in the response.
  res.send({
    code: "success",
    message: "Login successful",
    data : getUserinfo[0]
  });
});


app.listen(7001, () => {
  console.log('Server is running on port 7001');
});
