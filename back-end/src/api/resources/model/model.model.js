import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const ModelSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	brand: {
		ref: 'Brand',
		type: Schema.Types.ObjectId,
		required: true
	}
});
ModelSchema.plugin(mongoosePaginate);
export default mongoose.model('Model', ModelSchema);
