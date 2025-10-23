const { v4: uuidv4 } = require('uuid');
const Curso ={
    criar(nome, descricao){
        const curso = {
            nome: nome,
            descricao:descricao,
            codigoCurso: uuidv4(),
            dataCriacao: new Date(),
            alunosIncritos:[]
        }
        return curso
    }
}

module.exports = Curso;