import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const RepairSchema = new Schema({
    category: { type: String ,required: true},
	brand: { type: String ,required: true},
	model: { type: String ,required: true},
	task: { type: String ,required: true},
    reception_date: { type: Date,required: true },
	delivery_date: { type: Date ,required: true},
	serial:{type: String,required: true },
	usercode: { type: String ,required: true},
	missing: { type: String ,required: true},
	price: { type: Number ,required: true},
	status: { type: String,required: true },
	coment: { type: String ,required: true},
	client: { type: String ,required: true},
	// client: {
	// 	ref: 'Client',
	// 	type: Schema.Types.ObjectId,
	// 	required: true
	// },
});
// RepairSchema.plugin(mongoosePaginate);

export default mongoose.model('Repair', RepairSchema);