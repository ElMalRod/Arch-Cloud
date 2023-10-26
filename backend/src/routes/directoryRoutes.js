const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');


router.post('/', directoryController.createDirectory);
router.get('/:user_id', directoryController.getAllDirectories);

module.exports = router;
