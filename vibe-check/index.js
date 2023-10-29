/**
 * Created by Vadym Yatsyuk on 05.08.18
 */
const app = require('./config/express');
const http = require("http");
const socketio = require("socket.io");
const { port } = require('./config/vars');
const mongoose = require('mongoose'); 

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, function (err) { 
	if (err) throw err; 
	console.log('Successfully connected'); 
});

var dataSchema = new Schema({
	id: Number,
	name: { type: String, default: 'anonymous' },
	timestamps: [{
		time: Number,
		engagement: Number,
	}],
}, {
	collection: 'vibe-check-collection-test'
});

const Model = mongoose.model('Test', dataSchema);
const instance = new Model({ 
	id: 0,
	name: 'dummy',
	timestamps: [
		{
			time: 0,
			engagement: 0.5
		},
	],
});
await instance.save();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
io = socketio(server);
server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

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
// if(!module.parent) {
// 	app.listen(port, () => console.info(`Server started on port ${ port }`));
// }

module.exports = app;