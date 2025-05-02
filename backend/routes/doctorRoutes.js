const express = require('express');
const router = express.Router();
const { addDoctor, getDoctors } = require('../controllers/doctorController');

router.post('/', addDoctor);
router.get('/', getDoctors);

module.exports = router;