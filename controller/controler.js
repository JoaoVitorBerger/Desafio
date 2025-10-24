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
     renderHomeSobreCursos: (req,res)=>{
        res.render('aboutUser')
    },
    renderHomeSobreAlunos: (req,res)=>{
        res.render('aboutCourse')
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

    if(alunoEncontrado == undefined || cursoEncontrado == undefined){
        return res.render('message', {message: "Aluno ou curso não encontrado", caminho: "/homeInscricao"})
    }
    //console.log(alunoEncontrado, "aluno")
    //console.log(cursoEncontrado, "curso")
    if (ValuesInscricoes.find(inscrito => inscrito.aluno === alunoEncontrado.registroAcademico && inscrito.curso.includes(cursoEncontrado.codigoCurso))){
        return res.render('message', {message: "Aluno já inscrito nesse curso", caminho: "/homeInscricao"})
    }
    for (const aluno of ValuesAlunos){
        if (aluno.registroAcademico === alunoEncontrado.registroAcademico){
            aluno.cursosInscritos.push(cursoEncontrado.codigoCurso)
        }
    }
    for (const curso of ValuesCursos){
        if (curso.codigoCurso === cursoEncontrado.codigoCurso){
            //console.log(alunoEncontrado.registroAcademico)
            curso.alunosIncritos.push(alunoEncontrado.registroAcademico)
        }
    }
    ValuesInscricoes.push({aluno: alunoEncontrado.registroAcademico, curso: cursoEncontrado.codigoCurso})
    console.log(ValuesInscricoes)
    res.render('message', {message: "Aluno cadastrado no curso com sucesso", caminho: "/homeInscricao"})
    
   
},
    exibirInfoCurso : (req,res)=>{
        // id do curso
        // pesquisar no array de cursos se o curso existe, caso ele exista vou solicitar as informações dos alunos inscritos nele e enviar para o meu template
        let idCurso = req.params.codigoCurso
        //console.log(idCurso)
        let infoCurso = ValuesCursos.find(curso=>curso.codigoCurso == idCurso)
        let infoAlunos = ValuesAlunos.filter(aluno=>infoCurso.alunosIncritos.includes(aluno.registroAcademico))
        console.log(infoAlunos)
        return res.json(infoAlunos);
       
        
    },
    exibirInfoAluno : (req,res)=>{
        //nome do aluno
        // pesquisar no array e trazer todas as informações sobre os cursos em que o aluno está inscrito
        let idAluno = req.params.registroAluno
        console.log(idAluno)
        let infoAluno = ValuesAlunos.find(aluno=>aluno.registroAcademico == idAluno)
        console.log(infoAluno)
        let infoCursosAluno = ValuesCursos.filter(curso=>infoAluno.cursosInscritos.includes(curso.codigoCurso))
        console.log(infoCursosAluno)
        return res.json(infoCursosAluno);

    }

}
module.exports = controler