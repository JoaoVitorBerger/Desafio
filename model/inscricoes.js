const Inscricao = {
    criar(aluno, curso){
        if(curso.alunosIncritos.includes(aluno.registroAcademico)){
            console.log("Aluno já inscrito nesse curso.")
        }
        curso.alunosIncritos.push(aluno.registroAcademico)
        aluno.cursosInscritos.push(curso.codigoCurso)
        console.log("Aluno inscrito no curso com sucesso.")
    }
}