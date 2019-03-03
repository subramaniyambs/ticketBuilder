import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
var taskSchema = mongoose.Schema({
    _id:String,
    name :{ type: String }
});
const TicketSchema = new Schema({
	category: { type: String },
	brand: { type: String },
	model: { type: String },
	task: [taskSchema],
    reception_date: { type: Date },
	delivery_date: { type: Date },
	serial:{type: String },
	usercode: { type: String },
	missing: { type: String },
	price: { type: Number },
	status: { type: String },
	coment: { type: String },
	clientName:{type:String},
	client: {
		ref: 'Client',
		type: Schema.Types.ObjectId,
		required: true
	},

});
TicketSchema.plugin(mongoosePaginate);
export default mongoose.model('Ticket', TicketSchema);
