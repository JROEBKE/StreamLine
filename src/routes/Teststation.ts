import { Request, Response, Router } from 'express';
import { CREATED, OK, NO_CONTENT } from 'http-status-codes';
import {TeststationService} from "../services/TeststationService"
import {AppointmentService} from "../services/AppointmentService"
import dayjs from "dayjs";


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

router.get('/nearBy/:lat/:lon', async (req: Request, res: Response) => {
  //TODO: Validate user input. This explodes, when the coordinate is NaN

  const result = await TeststationService.findNearBy(parseFloat(req.params.lat), parseFloat(req.params.lon))
  return res.json(result);
});


router.get('/nearByAndSpare/:lat/:lon', async (req: Request, res: Response) => {
  //TODO: Validate user input. This explodes, when the coordinate is NaN

  const result = await TeststationService.findNearByAndSpareForDateRange(parseFloat(req.params.lat), parseFloat(req.params.lon))
  return res.json(result);
});

// This route to achieve workload for a single station for a sepcific date by providing offset from today, if date not set than today
router.get<{id: string}>('/:id/workload/:date', async (req: Request, res: Response) => {
  const result = await TeststationService.workloadSingleStation(req.params.id, req.params.date)
  return res.json(result);
});


// === Appointment routes ===


router.post('/:stationId/appointment', async (req: Request, res: Response) => {
  await AppointmentService.create(req.body, req.params.stationId)
  return res.status(CREATED).end();
});

router.get('/:stationId/appointment', async (req: Request, res: Response) => {
  //TODO validation fo query parameter
  const result = await AppointmentService.findAll(req.params.stationId, req.query.slot)
  return res.json(result);
});


router.get<{id: string}>('/:stationId/appointment/:appointmentId', async (req: Request, res: Response) => {
  const result = await AppointmentService.find(req.params.appointmentId)
  return res.json(result);
});

router.delete<{id: string}>('/:stationId/appointment/:appointmentId', async (req: Request, res: Response) => {
  await AppointmentService.delete(req.params.appointmentId)
  return res.status(NO_CONTENT).end();
;
});

export default router;
