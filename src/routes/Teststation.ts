import { Request, Response, Router } from 'express';
import { CREATED, OK } from 'http-status-codes';

import Teststation, { TeststationType } from "../entities/Teststation"

// Init shared
const router = Router();


router.post('/', async (req: Request, res: Response) => {
  const result = await Teststation.create(req.body)
  return res.status(CREATED).end();
});

router.get('/', async (req: Request, res: Response) => {
  const result = await Teststation.findAll()
  return res.json(result);
});


export default router;
