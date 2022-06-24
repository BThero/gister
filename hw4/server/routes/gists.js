const express = require('express');
const router = express.Router();

const {
	getGists,
	setGist,
	updateGist,
	deleteGist,
} = require('../controllers/gistController');

router.route('/').get(getGists).post(setGist);
router.route('/:id').put(updateGist).delete(deleteGist);

module.exports = router;
