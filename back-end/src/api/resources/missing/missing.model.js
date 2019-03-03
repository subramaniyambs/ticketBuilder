import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const MissingSchema = new Schema({
	name: { type: String }
});
// MissingSchema.plugin(mongoosePaginate);
export default mongoose.model('Missing', MissingSchema);
