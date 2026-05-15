const Pledge = require('../models/Pledge')

const createPledge = async (req, res, next) => {
  try {
    const { project, amount, message } = req.body

    if (!project || !amount) {
      res.status(400)
      throw new Error(
        'Project and amount are required'
      )
    }

    const pledge = await Pledge.create({
      user: req.user._id,
      project,
      amount,
      message,
    })

    res.status(201).json(pledge)
  } catch (error) {
    next(error)
  }
}

const getMyPledges = async (req, res, next) => {
  try {
    const pledges = await Pledge.find({
      user: req.user._id,
    })
      .populate('project')
      .sort({
        createdAt: -1,
      })

    res.status(200).json(pledges)
  } catch (error) {
    next(error)
  }
}

const deletePledge = async (
  req,
  res,
  next
) => {
  try {
    const pledge = await Pledge.findById(
      req.params.id
    )

    if (!pledge) {
      res.status(404)
      throw new Error('Pledge not found')
    }

    if (
      pledge.user.toString() !==
      req.user._id.toString()
    ) {
      res.status(403)
      throw new Error(
        'Not authorized to delete this pledge'
      )
    }

    pledge.status = 'cancelled'

    await pledge.save()

    res.status(200).json({
      message: 'Pledge cancelled successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPledge,
  getMyPledges,
  deletePledge,
}