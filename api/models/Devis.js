const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  typeRenovation: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateSoumission: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Devis', devisSchema);
