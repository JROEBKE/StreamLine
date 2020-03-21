import { Request, Response, Router } from 'express';
import { CREATED, OK } from 'http-status-codes';
import {TeststationService} from "../services/TeststationService"


// Init shared
const router = Router();


router.post('/', async (req: Request, res: Response) => {
  const result = await TeststationService.create(req.body)
  return res.status(CREATED).end();
});

router.get('/', async (req: Request, res: Response) => {
  const result = await TeststationService.findAll()
  return res.json(result);
});


export default router;
