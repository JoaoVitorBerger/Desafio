const { render } = require('ejs')
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
    renderHomeInscricao: (req,res)=>{
        res.render('inscricao')
    },
    createAluno: (req,res)=>{
        //Criar um aluno com as informações que vem do send do form e inserir no banco
        let {nome, mail} = req.body
        let normalizando_nome = nome.trim().replaceAll(" ", "_").toUpperCase()
        for (const aluno of ValuesAlunos){
            if (aluno.nome === normalizando_nome){
                return res.render('message', {message: "Aluno já cadastrado", caminho: "/homeAluno"})
            }
        }

        const novoAluno = Aluno.criar(normalizando_nome, mail)
        ValuesAlunos.push(novoAluno)
        console.log(ValuesAlunos)
        res.redirect('/homeAluno')
    },
    createCourse: (req,res)=>{
        
        let{nome_curso, descricao_curso} = req.body
        let normalizando_curso = nome_curso.trim().replaceAll(" ", "_").toUpperCase()
        let normalizando_descricao = descricao_curso.trim().replaceAll(" ", "_").toUpperCase()
        for (const curso of ValuesCursos){
            if (curso.nome === normalizando_curso && curso.descricao === normalizando_descricao){
                return res.render('message', {message: "Curso já cadastrado", caminho: "/homeCurso"})
            }
        }
        const novoCurso = Curso.criar(normalizando_curso,normalizando_descricao)
        ValuesCursos.push(novoCurso)
        console.log(ValuesCursos)
        res.redirect('/homeCurso')
    },
    inscreverUsuario: (req,res)=>{
    let {nome_aluno, nome_curso} = req.body
    let normalizando_nome_aluno = nome_aluno.trim().replaceAll(" ", "_").toUpperCase()
    let normalizando_nome_curso = nome_curso.trim().replaceAll(" ", "_").toUpperCase()
    let alunoEncontrado = ValuesAlunos.find(aluno => aluno.nome === normalizando_nome_aluno)
    let cursoEncontrado = ValuesCursos.find(curso => curso.nome === normalizando_nome_curso)

    if(alunoEncontrado == false || cursoEncontrado == false){
        return res.render('message', {message: "Aluno ou curso não encontrado", caminho: "/homeInscricao"})
    }
    console.log(alunoEncontrado)
    console.log(cursoEncontrado)
    if (ValuesInscricoes.find(aluno => aluno.registroAcademico === alunoEncontrado.registroAcademico && aluno.cursosInscritos.includes(cursoEncontrado.codigoCurso))){
        return res.render('message', {message: "Aluno já inscrito nesse curso", caminho: "/homeInscricao"})
    }
    
    ValuesInscricoes.push({aluno: alunoEncontrado, curso: cursoEncontrado})
    console.log(ValuesInscricoes)
    res.render('message', {message: "Aluno cadastrado no curso com sucesso", caminho: "/homeInscricao"})
}



}
module.exports = controler