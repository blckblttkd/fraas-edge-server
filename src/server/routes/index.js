import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Test from '../../universal/components/Test';

const router = express.Router();

router.get('/', async (req, res) => {
   const body = renderToString(<Test />);
   res.render('main', { body, layout: false });
});

export default router;
