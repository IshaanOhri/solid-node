import { NextFunction, Request, Response } from 'express';
import { status, message } from '../../config';
import { HttpError, HttpResponse } from '../../handlers';
import { catchAsync } from '../../middleware';
import {
	getActiveMinutes,
	getCaloriesExpended,
	getDistance,
	getHeartPoints,
	getHeartRate,
	getSleepDuration,
	getSpeed,
	getStepCount,
} from './googleapis';
const SolidClient = require('solid-node-client');

// POD Login route
const solidLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {
		username,
		password,
	}: {
		username: string;
		password: string;
	} = req.body;

	const client = new SolidClient.SolidNodeClient();

	const SOLID_PROVIDER = 'inrupt.net';

	const session = await client.login({
		idp: `https://${SOLID_PROVIDER}`, // e.g. https://solidcommunity.net
		username,
		password,
	});

	if (!session.isLoggedIn) {
		next(new HttpResponse(status.unauthorized, null, message.invalidCredentials));
	}

	await client.logout();

	next(new HttpResponse(status.ok, null));
});

// Write data to POD route
const writeData = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {
		username,
		password,
		filename,
		accessToken,
		startTime,
		endTime,
	}: {
		username: string;
		password: string;
		filename: [string];
		accessToken: string;
		startTime: number;
		endTime: number;
	} = req.body;

	const client = new SolidClient.SolidNodeClient();

	const SOLID_PROVIDER = 'inrupt.net';

	const session = await client.login({
		idp: `https://${SOLID_PROVIDER}`, // e.g. https://solidcommunity.net
		username,
		password,
	});

	if (!session.isLoggedIn) {
		next(new HttpError(status.unauthorized, {}, message.invalidCredentials));
	}

	// Call API

	const steps = await getStepCount(accessToken, startTime, endTime, 86400000);
	const distance = await getDistance(accessToken, startTime, endTime, 86400000);
	const activeMinutes = await getActiveMinutes(accessToken, startTime, endTime, 86400000);
	const caloriesExpended = await getCaloriesExpended(accessToken, startTime, endTime, 86400000);
	const heartPoints = await getHeartPoints(accessToken, startTime, endTime, 86400000);
	const heartRate = await getHeartRate(accessToken, startTime, endTime, 86400000);
	const speed = await getSpeed(accessToken, startTime, endTime, 86400000);
	// const steps = await getSleepDuration(accessToken, startTime, endTime, 86400000);

	for (var i = 0; i < 7; i++) {
		const podBody = {
			steps: steps[i],
			distance: distance[i],
			activeMinutes: activeMinutes[i],
			caloriesExpended: caloriesExpended[i],
			heartPoints: heartPoints[i],
			heartRate: heartRate[i],
			speed: speed[i],
		};

		let writeResponse = await client.fetch(`https://${username}.${SOLID_PROVIDER}/pod-health/${filename[i]}`, {
			method: 'PUT',
			body: JSON.stringify(podBody),
			headers: { 'Content-Type': 'application/json' },
		});

		if (writeResponse.status != 200 && writeResponse.status != 201) {
			next(new HttpError(status.serverError, {}, message.serverError));
		}
	}

	await client.logout();

	next(new HttpResponse(status.created, {}));
});

// Read data from POD route
const readData = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {
		username,
		password,
		filename,
	}: {
		username: string;
		password: string;
		filename: [string];
	} = req.body;

	const client = new SolidClient.SolidNodeClient();

	const SOLID_PROVIDER = 'inrupt.net';

	const session = await client.login({
		idp: `https://${SOLID_PROVIDER}`, // e.g. https://solidcommunity.net
		username,
		password,
	});

	if (!session.isLoggedIn) {
		next(new HttpError(status.unauthorized, {}, message.invalidCredentials));
	}

	const steps: number[] = [],
		distance: number[] = [],
		activeMinutes: number[] = [],
		caloriesExpended: number[] = [],
		heartRate: number[] = [],
		heartPoints: number[] = [],
		sleepDuration: number[] = [],
		speed: number[] = [];

	for (var i = 0; i < filename.length; i++) {
		let readResponse = await client.fetch(`https://${username}.${SOLID_PROVIDER}/pod-health/${filename[i]}`);

		if (readResponse.status != 200 && readResponse.status != 201) {
			next(new HttpError(status.serverError, {}, message.serverError));
		}

		const podData = JSON.parse(await readResponse.text());

		steps.push(podData.steps);
		distance.push(podData.distance);
		activeMinutes.push(podData.activeMinutes);
		caloriesExpended.push(podData.caloriesExpended);
		heartPoints.push(podData.heartPoints);
		heartRate.push(podData.steps);
		speed.push(podData.speed);
	}

	const finalResponse: any = {
		steps,
		distance,
		activeMinutes,
		caloriesExpended,
		heartPoints,
		heartRate,
		speed,
	};

	await client.logout();

	next(new HttpResponse(status.ok, finalResponse));
});

export { solidLogin, writeData, readData };
