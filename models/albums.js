import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    id: { type: String, required: true },
    imageURL: { type: String, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true }
}, { collection: 'albums' }); 

const Album = mongoose.models.Album || mongoose.model('Album', albumSchema);

export default Album;
