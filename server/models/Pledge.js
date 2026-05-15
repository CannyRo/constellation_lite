const mongoose = require('mongoose')

const pledgeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },

    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Pledge', pledgeSchema)