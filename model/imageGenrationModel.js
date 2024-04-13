const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageGenerationSchema = new mongoose.Schema({
    title: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  const imageGeneration = mongoose.model('image_genration', imageGenerationSchema);
  
  module.exports = imageGeneration;