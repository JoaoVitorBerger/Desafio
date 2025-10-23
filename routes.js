const express = require('express')
const controler = require('./controller/controler')

const router = express.Router()


router.get('/', controler.renderHome)
router.get('/homeAluno', controler.renderHomeAluno)
router.get('/homeCurso', controler.renderHomeCurso)
router.get('/homeInscricao', controler.renderHomeInscricao)

router.post('/aluno/create', controler.createAluno)
router.post('/curso/create', controler.createCourse)
router.post('/inscricao/create', controler.inscreverUsuario)

module.exports = router