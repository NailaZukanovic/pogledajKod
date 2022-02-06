const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('443342695189-vbm99na0kus9ihit4tvq3csaoga8hds7.apps.googleusercontent.com')
const express = require("express");
const router = express.Router();


router.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '443342695189-vbm99na0kus9ihit4tvq3csaoga8hds7.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await express.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    req.session.userId = user.id
    res.status(201)
    res.json(user)
})

// Check authentication middleware

router.use(async (req, res, next) => {
    const user = await express.user.findFirst({where: { id:  req.session.userId }})
    req.user = user
    next()
})

// Sign out route

router.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

// "Me" route

router.get("/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})