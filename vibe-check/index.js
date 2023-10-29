/**
 * Created by Vadym Yatsyuk on 05.08.18
 */
const app = require('./config/express');
// const http = require("http");
// const socketio = require("socket.io");
const { db_url, port } = require('./config/vars');
const mongoose = require('mongoose'); 
// const Model = require('./models/userModel');
// const getLastDataPoint = (sec) => {
// 	return Math.floor( sec / 5 ) * 5;
// }

mongoose.connect(db_url, { useNewUrlParser: true });

// const PORT = port || 5000;
// const server = http.createServer(app);
// io = socketio(server);
// server.listen(PORT, () => {
//   console.log(`server running at port ${PORT}`);
// });

// io.on("connection", (socket) => {
// 	const instance = new Model({ 
// 		id: 0,
// 		name: 'dummy',
// 		timestamps: [],
// 	});
// 	socket.on("join", ({ id, name }, callback) => {
//     if (error) {
//       callback(error);
//     } else {
// 			instance.id = id;
// 			instance.name = name;
// 		}
// 	});
// 	socket.on("log", ({ time, engagement }, callback) => {
//     if (error) {
//       callback(error);
//     } else {
// 			instance.timestamps.push({ time, engagement });
// 		}
//   });
// 	socket.on("get-average", async (callback) => {
// 		if (error) {
// 			callback(error);
// 			return;
// 		}
// 		const instances = await Model.find({});
// 		const engagementSum = new Map(); // key = sec, value = (totalEngagement, count)
// 		instances.forEach((inst) => {
// 			var currTime = 0;
// 			const timestamps = inst.timestamps.sort();
// 			timestamps.forEach(({ time, engagement }) => {
// 				if (time > currTime) {
// 					currTime = getLastDataPoint(time);
// 					const value = engagementSum.get(currTime);
// 					if (value == undefined) {
// 						engagementSum.set(currTime, { totalEngagement, count: 1 });
// 					} else {
// 						var { totalEngagement, count } = value;
// 						totalEngagement += engagement;
// 						count++;
// 						engagementSum.set(currTime, { totalEngagement, count });
// 					}
// 					currTime += 5;
// 				}
// 			});
// 		});
// 		const engagementAverage = new Map();
// 		for (const [key, value] of engagementSum) { 
// 			var { totalEngagement, count } = value;
// 			avgEngagement = totalEngagement / count;
// 			engagementAverage.set(key, avgEngagement);
// 		}
// 		callback(engagementAverage);
// 	});
// 	socket.on("disconnect", () => {
// 		instance.save();
// 	});
// })

// when user connect, connect to hume ai
// when user emit photo, send photo to hume ai, retrieve the emotions,
// 		parse the emotions, and store the emotion to a sorted list of timestamp
// 		under the user; then send back the parse result to user.
// when user emit "get all attension span", send average of parsed result 
// when user disconnects, disconnects to hume ai

// schema:
// userID (name):
// 	timestamps:
// 		{
//			time:
//				result:
//  	}

// listen to requests
if(!module.parent) {
	app.listen(port, () => console.info(`Server started on port ${ port }`));
}

module.exports = app;