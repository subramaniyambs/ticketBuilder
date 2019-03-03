import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const TaskSchema = new Schema({
	name: { type: String, required: true }
});
TaskSchema.plugin(mongoosePaginate);
export default mongoose.model('Task', TaskSchema);
