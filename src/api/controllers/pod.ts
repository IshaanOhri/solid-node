import { NextFunction, Request, Response } from 'express';
import { status, message } from '../../config';
import { HttpError, HttpResponse } from '../../handlers';
import { catchAsync } from '../../middleware';
const SolidClient = require('solid-node-client');

// POD Login route
const podLogin = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
		steps,
		distance,
		activeMinutes,
		caloriesExpended,
		heartRate,
		heartPoints,
		speed,
		sleepDuration,
	}: {
		username: string;
		password: string;
		filename: string;
		steps: number;
		distance: number;
		activeMinutes: number;
		caloriesExpended: number;
		heartRate: number;
		heartPoints: number;
		speed: number;
		sleepDuration: number;
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

	const podBody = { steps, distance, speed, activeMinutes, caloriesExpended, heartPoints, heartRate, sleepDuration };

	let writeResponse = await client.fetch(`https://${username}.${SOLID_PROVIDER}/pod-health/${filename}`, {
		method: 'PUT',
		body: JSON.stringify(podBody),
		headers: { 'Content-Type': 'application/json' },
	});

	if (writeResponse.status != 200 && writeResponse.status != 201) {
		next(new HttpError(status.serverError, {}, message.serverError));
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
		filename: string;
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

	let readResponse = await client.fetch(`https://${username}.${SOLID_PROVIDER}/pod-health/${filename}`);
	const podData = JSON.parse(await readResponse.text());

	await client.logout();

	next(new HttpResponse(status.ok, podData));
});

export { podLogin, writeData, readData };
