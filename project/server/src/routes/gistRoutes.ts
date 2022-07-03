import express from 'express';
import { protect } from '../middleware/authMiddleware';

import {
	getPublicGists,
	getMyGists,
	setGist,
	updateGist,
	deleteGist,
} from '../controllers/gistController';

const router = express.Router();

router.route('/public').get(protect, getPublicGists);
router.route('/public/:search').get(protect, getPublicGists);
router.route('/').get(protect, getMyGists).post(protect, setGist);
router.route('/:id').put(protect, updateGist).delete(protect, deleteGist);

export default router;
