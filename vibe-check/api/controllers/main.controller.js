/**
 * Created by Vadym Yatsyuk on 13.08.18
 */
const httpStatus = require('http-status');
const Model = require('../../models/userModel');
const getLastDataPoint = (sec) => {
	return Math.floor( sec / 5 ) * 5;
}

exports.health = (req, res) => {
	res.status(httpStatus.OK);
	return res.json({
		status: 'ok'
	});
};
exports.protected = (req, res) => {
	res.status(httpStatus.OK);
	return res.json({
		status: 'protected route: ok'
	});
};
exports.public = (req, res) => {
	res.status(httpStatus.OK);
	return res.json({
		status: 'Public route: ok'
	});
};

exports.post = (req, res) => {
	return res.status(httpStatus.CREATED).json({
    status: "ok",
  });
}

exports.vibe = (req, res) => {
	const instance = new Model({ 
		id: 0,
		name: 'dummy',
		timestamps: [],
	});
	const body = req.body;
	if (body.id) instance.id = body.id;
	if (body.name) instance.name = body.name;
	for (const index in body.timestamps) {
		const dict = body.timestamps[index];
		instance.timestamps.push(dict);
  }
	console.log(instance);
	instance.save();
	res.status(httpStatus.OK);
	return res.status(httpStatus.CREATED).json({
		status: 'ok'
	});
}

exports.getVibe = async (req, res) => {
	const instances = await Model.find({});
	const engagementSum = new Map(); // key = sec, value = (totalEngagement, count)
	instances.forEach((inst) => {
		var currTime = 0;
		const timestamps = inst.timestamps.sort((a, b) => a.time < b.time);
		timestamps.forEach((value) => {
			// console.log(value);
			const {time, engagement} = value;

			if (time >= currTime) {
				currTime = getLastDataPoint(time);
				const value = engagementSum.get(currTime);
				if (!engagementSum.has(currTime)) {
					engagementSum.set(currTime, { totalEngagement: engagement, count: 1 });
				} else {
					// console.log(value);
					var { totalEngagement, count } = value;
					totalEngagement += engagement;
					count++;
					engagementSum.set(currTime, { totalEngagement, count });
				}
				currTime += 5;
			}
		});
	});
	// console.log(engagementSum);
	const timestamps = [];
	for (const [key, value] of engagementSum) {
		var { totalEngagement, count } = value;
		avgEngagement = totalEngagement / count;
		timestamps.push({ 
			time: key,
			engagement: avgEngagement,
		});
	}
	// console.log(timestamps);
	return res.json({
		timestamps
	})
}