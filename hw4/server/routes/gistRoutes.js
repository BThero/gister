const express = require('express');
const router = express.Router();

const {
	getGists,
	setGist,
	updateGist,
	deleteGist,
} = require('../controllers/gistController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGists).post(protect, setGist);
router.route('/:id').put(protect, updateGist).delete(protect, deleteGist);

module.exports = router;
