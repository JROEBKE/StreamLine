import { Request, Response, Router } from 'express';
import { CREATED, OK, NO_CONTENT } from 'http-status-codes';
import {TeststationService} from "../services/TeststationService"


// Init shared
const router = Router();


router.post('/', async (req: Request, res: Response) => {
  await TeststationService.create(req.body)
  return res.status(CREATED).end();
});

router.get('/', async (req: Request, res: Response) => {
  const result = await TeststationService.findAll()
  return res.json(result);
});

router.get<{id: string}>('/:id', async (req: Request, res: Response) => {
  const result = await TeststationService.find(req.params.id)
  return res.json(result);
});

router.delete<{id: string}>('/:id', async (req: Request, res: Response) => {
  await TeststationService.delete(req.params.id)
  return res.status(NO_CONTENT).end();
;
});

export default router;
