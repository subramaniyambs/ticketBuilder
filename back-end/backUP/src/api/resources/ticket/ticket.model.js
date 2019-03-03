import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const TicketSchema = new Schema({
	category: { type: String, required: true },
	brand: { type: String, required: true },
	model: { type: String, required: true },
	task: { type: String, required: true },
	missing: { type: String, required: true },
	serial: { type: String },
	usercode: { type: String },
	price: { type: Number },
	status: { type: String, required: true },
	reception_date: { type: Date, required: true },
	delivery_date: { type: Date, required: true },
	coment: { type: String },
	client: {
		ref: 'Client',
		type: Schema.Types.ObjectId,
		required: true
	}
});
TicketSchema.plugin(mongoosePaginate);
export default mongoose.model('Ticket', TicketSchema);
