//Para a criação dos alunos devemos ter o nome, e-mail e data de cadastro
const { v4: uuidv4 } = require('uuid');
const Aluno = {
    criar(nome, email) {
        const aluno = {
            nome: nome,
            email: email,
            registroAcademico: uuidv4(),
            dataCadastro: new Date(),
            cursosInscritos:[]
        }
        return aluno
    }
}

module.exports = Aluno;