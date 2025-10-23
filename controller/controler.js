const Aluno = require('../model/alunos')
const Curso = require('../model/cursos')
const ValuesAlunos = []
const ValuesCursos = []
const ValuesInscricoes = []
const controler = {
    renderHome: (req,res)=>{
        res.render('index')
    },
    renderHomeAluno: (req,res)=>{
        res.render('createUser')
    },
    renderHomeCurso: (req,res)=>{
        res.render('createCourse')
    }
    ,
    createAluno: (req,res)=>{
        //Criar um aluno com as informações que vem do send do form e inserir no banco
        let {nome, mail} = req.body
        console.log(nome == 'Carlos')
        if (ValuesAlunos.includes('Carlos')){
            res.send("Aluno já cadastrado")
        }
        const novoAluno = Aluno.criar(nome, mail)
        ValuesAlunos.push(novoAluno)
        res.redirect('/homeAluno')
    },
    createCourse: (req,res)=>{
        
        let{nome_curso, descricao_curso} = req.body
        let normalizando_curso = nome_curso.trim().replaceAll(" ", "_").toUpperCase()
        let normalizando_descricao = descricao_curso.trim().replaceAll(" ", "_").toUpperCase()
        if (ValuesCursos.includes(normalizando_descricao)){
            res.send("Curso já cadastrado")
        }
        const novoCurso = Curso.criar(normalizando_curso,normalizando_descricao)
        ValuesCursos.push(novoCurso)
        console.log(ValuesCursos)
        res.redirect('/homeCurso')
    }


}
module.exports = controler