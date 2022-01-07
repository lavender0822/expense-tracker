const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.render('login', { email, warning_msg: '請輸入使用者姓名和密碼。' })

    }
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.render('login', { email, warning_msg: info.message })
        }
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不符' })
    }
    if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                errors.push({ message: '此信箱已註冊' })
                return res.render('register', { errors, name, email, password, confirmPassword })
            }
            return bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({ name, email, password: hash }))
                .then(() => res.redirect('/'))
                .catch(error => console.log(error))
        })
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已成功登出')
    res.redirect('/users/login')
})

module.exports = router