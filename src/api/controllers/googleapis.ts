import fetch from 'node-fetch';

// Function to save and return step count for past 7 days from Google API
const getStepCount = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.step_count.delta',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes: any = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[0].intVal;
				if (value !== undefined) values.push(value);
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("steps", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Steps Error ${e}`);
	}
};

// // Function to save and return distance for past 7 days from Google API
const getDistance = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.distance.delta',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[0].fpVal;
				if (value !== undefined) values.push((value / 1000).toPrecision(2));
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("distance", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Distance Error ${e}`);
	}
};

// Function to save and return active minutes for past 7 days from Google API
const getActiveMinutes = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.active_minutes',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[0].intVal;
				if (value !== undefined) values.push(value);
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("activeMinutes", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Active Minutes Error ${e}`);
	}
};

// Function to save and return calories expended for past 7 days from Google API
const getCaloriesExpended = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.calories.expended',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[0].fpVal;
				if (value !== undefined) values.push(Math.ceil(value));
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("caloriesExpended", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Calories Expended Error ${e}`);
	}
};

// Function to save and return heart rate for past 7 days from Google API
const getHeartRate = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.heart_rate.bpm',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value;

				var beats = 0,
					count = 0;

				value.forEach((each: any) => {
					count += 1;
					beats += each.fpVal;
				});

				values.push(Math.ceil(beats / count));
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("heartRate", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Heart Rate Error ${e}`);
	}
};

// Function to save and return sleep duration for past 7 days from Google API
const getSleepDuration = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.sleep.segment',
			},
		],
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[1].intVal;
				if (value !== undefined) values.push(value);
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("sleepDuration", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Sleep Duration Error ${e}`);
	}
};

// Function to save and return speed for past 7 days from Google API
const getSpeed = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	// Create request body
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.speed',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});

	// Create request options
	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		// Send API request
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);

		// Convert response into json
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		// Extract required data and push into `values`
		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value;

				var speed = 0,
					count = 0;

				value.forEach((each: any) => {
					count += 1;
					speed += each.fpVal;
				});

				values.push((speed / count).toPrecision(2));
			} catch (error) {
				values.push(0);
			}
		});

		// Save to session storage
		// sessionStorage.setItem("speed", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Speed Error ${e}`);
	}
};

// Function to save and return heart points for past 7 days from Google API
const getHeartPoints = async (
	accessToken: string,
	startTimeMillis: number,
	endTimeMillis: number,
	durationMillis: number
) => {
	var raw = JSON.stringify({
		aggregateBy: [
			{
				dataTypeName: 'com.google.heart_minutes',
			},
		],
		bucketByTime: {
			durationMillis: durationMillis,
		},
		startTimeMillis: startTimeMillis,
		endTimeMillis: endTimeMillis,
	});
	// console.log("🚀 ~ file: googleapis.js ~ line 533 ~ endTimeMillis", endTimeMillis)
	// console.log("🚀 ~ file: googleapis.js ~ line 533 ~ startTimeMillis", startTimeMillis)

	var requestOptions = {
		method: 'POST',
		headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
		body: raw,
	};

	try {
		const fetchReq = await fetch(
			'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
			requestOptions
		);
		const fetchReqRes = await fetchReq.json();

		var values: any = [];

		const bucket = fetchReqRes.bucket;

		bucket.forEach((day: any) => {
			try {
				const value = day.dataset[0].point[0].value[0].fpVal;
				if (value !== undefined) values.push(value);
				else values.push(0);
			} catch (error) {
				values.push(0);
			}
		});

		// sessionStorage.setItem("heartPoints", JSON.stringify(values));

		return values;
	} catch (e) {
		console.log(`Heart Minutes Error ${e}`);
	}
};

export {
	getStepCount,
	getDistance,
	getActiveMinutes,
	getCaloriesExpended,
	getHeartRate,
	getSleepDuration,
	getSpeed,
	getHeartPoints,
};
