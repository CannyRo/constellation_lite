const express = require('express')

const {
  createPledge,
  getMyPledges,
  deletePledge,
} = require('../controllers/pledgeController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createPledge)

router.get('/me', protect, getMyPledges)

router.delete('/:id', protect, deletePledge)

module.exports = router