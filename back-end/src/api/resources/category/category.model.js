
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const CategorySchema = new Schema({
	name: { type: String, required: true },

});
CategorySchema.plugin(mongoosePaginate);
export default mongoose.model('Category', CategorySchema);
