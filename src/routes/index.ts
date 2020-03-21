import { Router } from 'express';
import TestationRouter from './Teststation';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/stations', TestationRouter);

// Export the base-router
export default router;
