const Inscricao = {
    criar(aluno, curso){
        const inscricao = {
            aluno: aluno,
            curso: curso,
            dataInscricao: new Date()
        }
        return inscricao
    }
}