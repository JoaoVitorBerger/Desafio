const express = require('express')
const controler = require('./controller/controler')

const router = express.Router()


router.get('/', controler.renderHome)
router.get('/homeAluno', controler.renderHomeAluno)
router.get('/homeCurso', controler.renderHomeCurso)

router.post('/aluno/create', controler.createAluno)
router.post('/curso/create', controler.createCourse)

module.exports = router