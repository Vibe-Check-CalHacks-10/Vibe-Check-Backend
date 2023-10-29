var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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

const Model = mongoose.model('vibe-check-db', dataSchema);
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
instance.save();

module.exports = Model;