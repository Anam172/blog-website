const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Contact API is working!");
  });

router.post("/send-email", sendContactEmail);

module.exports = router;
