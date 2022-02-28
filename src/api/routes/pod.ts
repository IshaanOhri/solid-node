import { Router } from 'express';
import { health, writeData, podLogin, readData } from '../controllers';

const podRouter: Router = Router();

// @desc	POD Login
// @route	POST /podLogin
podRouter.post('/podLogin', podLogin);

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
