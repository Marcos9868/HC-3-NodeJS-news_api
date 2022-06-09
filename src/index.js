// Importação dos módulos
const express = require('express')
const statusRoute = require('./routes/status.route')
const categoryNews = require('./routes/category.news.route')
const newsRoute = require('./routes/news.route')

// Innstância Express
const app = express()

// Configuração Banco de Dados
const db = require('./db/config')

// Configurações Gerais
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
// Rota Status:
app.use(statusRoute)

// Rota Categorias:
app.use(categoryNews)

// Rota Notícias:
app.use(newsRoute)

app.listen(4000, () => {
  console.log('Servidor rodando em http://localhost:4000')
})