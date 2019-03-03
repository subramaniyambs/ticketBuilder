import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const BrandSchema = new Schema({
	name: { type: String, required: true }
});
BrandSchema.plugin(mongoosePaginate);
export default mongoose.model('Brand', BrandSchema);
