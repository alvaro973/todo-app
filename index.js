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

        console.log(dados)
       const tarefas = dados.map((dado) => {
        return{
            id: dado.id,
            decricao: dado.decricao,
            completa: dado.completa === 0 ? false : true
        }
       })
       console.log(tarefas)

    })

    resposta.render('home')
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
