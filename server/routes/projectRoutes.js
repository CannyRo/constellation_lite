const express = require('express')

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController')

const { 
  protect,
  isAdmin,
 } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getProjects)
router.get('/:id', getProjectById)
router.post('/', protect, isAdmin, createProject)
router.put('/:id', protect, isAdmin, updateProject)
router.delete('/:id', protect, isAdmin, deleteProject)

module.exports = router