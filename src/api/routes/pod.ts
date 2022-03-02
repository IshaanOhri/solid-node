import { Router } from 'express';
import { health, writeData, solidLogin, readData } from '../controllers';

const podRouter: Router = Router();

// @desc	POD Login
// @route	POST /solidLogin
podRouter.post('/solidLogin', solidLogin);

// @desc	Write Data to POD
// @route	POST /writeData
podRouter.post('/writeData', writeData);

// @desc	Read Data from POD
// @route	POST /readData
podRouter.post('/readData', readData);

// @desc	Health Route
// @route	GET /health
podRouter.get('/health', health);

export { podRouter };
