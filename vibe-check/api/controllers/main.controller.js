/**
 * Created by Vadym Yatsyuk on 13.08.18
 */
const httpStatus = require('http-status');
const Model = require('../../models/userModel');

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
	for ({ time, engagement } in body.timestamps) {
		instance.timestamps.push({ time, engagement });
  }
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
		const timestamps = inst.timestamps.sort();
		timestamps.forEach(({ time, engagement }) => {
			if (time > currTime) {
				currTime = getLastDataPoint(time);
				const value = engagementSum.get(currTime);
				if (value == undefined) {
					engagementSum.set(currTime, { totalEngagement, count: 1 });
				} else {
					var { totalEngagement, count } = value;
					totalEngagement += engagement;
					count++;
					engagementSum.set(currTime, { totalEngagement, count });
				}
				currTime += 5;
			}
		});
	});
	const engagementAverage = new Map();
	for (const [key, value] of engagementSum) { 
		var { totalEngagement, count } = value;
		avgEngagement = totalEngagement / count;
		engagementAverage.set(key, avgEngagement);
	}
	return res.json({
		engagementAverage
	})
}