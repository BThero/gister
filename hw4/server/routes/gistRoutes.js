const express = require('express');
const router = express.Router();

const {
	getPublicGists,
	getMyGists,
	setGist,
	updateGist,
	deleteGist,
} = require('../controllers/gistController');

const { protect } = require('../middleware/authMiddleware');

router.route('/public').get(protect, getPublicGists);
router.route('/').get(protect, getMyGists).post(protect, setGist);
router.route('/:id').put(protect, updateGist).delete(protect, deleteGist);

module.exports = router;
