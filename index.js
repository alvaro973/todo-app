const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require ("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


app.post('/completar', (requisicao, resposta) => {
    const id = requisicao.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) =>{
        if (erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/descompletar', (requisicao, resposta) => {
    const id = requisicao.body.id

    console.log(id)

    const sql = `
        UPDATE tarefas
        SET completa = '0'
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }
        resposta.redirect('/')
    })
})

app.post('/criar', (requisicao, resposta) =>{
    const decricao = requisicao.body.decricao
    const completa = 0

// banco de dados foi escrito descricao sem o "S"
    const sql = ` 
        INSERT INTO tarefas(decricao, completa)
        VALUES ('${decricao}', '${completa}') 
    `

    conexao.query(sql, (erro) => {
        if (erro){
           return console.log(erro)
        }
        resposta.redirect('/')
    })
})
// banco de dados foi escrito descricao sem o "S"
app.get('/',(requisicao, resposta) => {
    const sql = 'SELECT * FROM  tarefas'

    conexao.query(sql, (erro, dados) =>{
        if (erro){
           return console.log(erro)
        }
    
       const tarefas = dados.map((dado) => {
        return{
            id: dado.id,
            decricao: dado.decricao,
            completa: dado.completa === 0 ? false : true
        }
       })

       const tarefasAtivas = tarefas.filter((tarefa) => {
        return tarefa.completa === false && tarefa
       })

       const quantidadeTarefasAtivas = tarefasAtivas.length

       resposta.render('home', {tarefas, quantidadeTarefasAtivas})
    })
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adimi01",
    database: "todoapp",
    port: 3306
})

conexao.connect((erro) => {
    if (erro){
        return console.log(erro)
    }
    console.log("estou rodando o mysql")
    
    app.listen(3000,() => {
        console.log("servidor rodando na porta 3000")
    })
})
