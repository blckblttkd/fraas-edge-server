import express from 'express';
import mainHandler from './main';

const router = express.Router();

router.get('/', mainHandler);

export default router;
