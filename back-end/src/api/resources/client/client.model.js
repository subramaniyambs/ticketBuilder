import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const ClientSchema = new Schema({
	name: { type: String, required: true },
	address: { type: String },
	post: { type: String },
	city: { type: String },
	phone: { type: String },
	email: { type: String },
	siren: { type: String },
	tva: { type: String }
});
 ClientSchema.plugin(mongoosePaginate);
export default mongoose.model('Client', ClientSchema);
