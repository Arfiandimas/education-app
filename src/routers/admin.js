const express = require('express')
const Admin = require('../models/admin')
const authAdmin = require('../middleware/authAdmin')
const sharp = require('sharp')
const uploadAvatar = require('../middleware/uploadAvatar')
const router = new express.Router()

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/admin/logout', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/admin/me', authAdmin, async (req, res) => {
    res.send(req.admin)
})

router.put('/admin/me', authAdmin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'phone', 'email', 'password']
    const isInvalidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isInvalidOperation) {
        return res.status(400).send({ error: 'Invalid updates!, ' + Object.keys(req.body) + ' not in database!!' })
    }

    try {
        updates.forEach((update) => req.admin[update] = req.body[update])
        await req.admin.save()
        res.send(req.admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/admin/me/avatar', authAdmin, uploadAvatar.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer()
    req.admin.avatar = buffer
    await req.admin.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/admin/me/avatar', authAdmin, async (req, res) => {
    try {
        const admin = req.admin

        if (!admin.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(admin.avatar)
    } catch (error) {
        res.send(404).send()
    }
})


module.exports = router