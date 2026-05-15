const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(400)
      throw new Error('All fields are required')
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      res.status(400)
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('All fields are required')
    }

    const user = await User.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      res.status(401)
      throw new Error('Invalid credentials')
    }

    const token = generateToken(user._id)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    })
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const { username, email } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    user.username = username || user.username
    user.email = email || user.email

    const updatedUser = await user.save()

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

const deleteMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    await user.deleteOne()

    res.status(200).json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  deleteMe,
}