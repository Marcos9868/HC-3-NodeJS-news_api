const router = require('express')
const newsRepository = require('../repositories/news.repository')

const newsRoute = router()

newsRoute.get('/news-api/v1/noticias', async (req, res, next) => {
  const news = await newsRepository.getAllNews()
  res.status(200).send(news)
})

newsRoute.get('/news-api/v1/noticias/:id', async (req, res, next) => {
  try {
    const idNews = req.params.id
    const getNews = await newsRepository.getNewsById(idNews)
    res.status(200).send(getNews)
  } catch (error) {
    next(error)
  }
})

newsRoute.post('/news-api/v1/noticias', async (req, res, next) => {
  const newNews = req.body
  const insertNew = await newsRepository.createNews(newNews)
  res.status(201).send(insertNew)
})

newsRoute.put('/news-api/v1/noticias/:id', async (req, res, next) => {
  try {
    const idNews = req.params.id
    const updatedNews = req.body
    updatedNews.id = idNews

    await newsRepository.updateNewsById(updatedNews)
    res.status(200).send(updatedNews)
  } catch(error) {
    next(error)
  }
})

newsRoute.delete('/news-api/v1/noticias/:id', async (req, res, next) => {
  try {
    const idNews = req.params.id
    await newsRepository.removeNewsById(idNews)
    res.send(204).send('Notícia Removida')
  } catch (error) {
    next(error)
  }
})

newsRoute.delete('/news-api/v1/noticias', async (req, res, next) => {
  await newsRepository.removeAllNews()
  res.send(204).send('Notícias Removidas')
})

module.exports = newsRoute