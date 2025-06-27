const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  },
});
const upload = multer({ storage });


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


app.post('/reg', upload.single('profile'), async (req, res) => {
  const { name, email, password, phone_no } = req.body;
  const profile = req.file ? req.file.filename : null;

  if (!name || !email || !password || !phone_no || !profile) {
    return res.status(400).json({ message: "All fields and image required" });
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const query = `INSERT INTO balaji (name, email, password, phone_no, profile) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, email, hashedPassword, phone_no, profile];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.query(`SELECT * FROM balaji WHERE email = ?`, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password.toString(), user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email,profile:user.profile }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });
  });
});


app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  db.query("SELECT * FROM balaji WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    db.query(
      "UPDATE balaji SET otp = ?, otp_created_at = NOW() WHERE email = ?",
      [otp, email],
      (err2) => {
        if (err2) return res.status(500).json({ message: "Failed to update OTP" });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "🔐 Your OTP Code",
          html: `<h3>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</h3>`,
        };

        transporter.sendMail(mailOptions, (err3) => {
          if (err3) {
            console.error("Email send error:", err3);
            return res.status(500).json({ message: "Failed to send OTP email" });
          }
          return res.status(200).json({ message: "OTP sent successfully" });
        });
      }
    );
  });
});


app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  db.query("SELECT otp, otp_created_at FROM balaji WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    const storedOtp = result[0].otp;
    const createdAt = result[0].otp_created_at;
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffMin = (now - createdTime) / 1000 / 60;

    if (!storedOtp || !createdAt) return res.status(400).json({ message: "No OTP found. Please request again." });
    if (diffMin > 5) return res.status(410).json({ message: "OTP expired" });
    if (storedOtp !== otp) return res.status(401).json({ message: "Invalid OTP" });

    db.query("UPDATE balaji SET otp = NULL, otp_created_at = NULL WHERE email = ?", [email], () => {
      return res.status(200).json({ message: "OTP verified successfully" });
    });
  });
});


app.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.query('SELECT id, name, email, profile FROM balaji WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.status(200).json(result[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
