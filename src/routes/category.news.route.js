const router = require('express')
const categoryNewsRepository = require('../repositories/category.news.repository')

const categoryNews = router()

categoryNews.get('/news-api/v1/categorias', async (req, res, next) => {
  const categoryNews = await categoryNewsRepository.getAllCategoryNews()
  res.status(200).send(categoryNews)
})

categoryNews.get('/news-api/v1/categorias/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const category = await categoryNewsRepository.getCategoryNewById(id)
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

categoryNews.get('/news-api/v1/categorias/:id/noticias', async (req, res, next) => {
  try {
    const idCategory = req.params.id
    const category = await categoryNewsRepository.getNewsByCategoryId(idCategory)
    res.status(200).send(category)
  } catch (error) {
    next(error)
  }
})

categoryNews.post('/news-api/v1/categorias', async (req, res, next) => {
  const newCategory = req.body
  const insertCategory = await categoryNewsRepository.createCategory(newCategory)
  res.status(201).send(insertCategory)
})

categoryNews.put('/news-api/v1/categorias/:id', async (req, res, next) => {
  try {
    const idCategory = req.params.id
    const modifiedCategory = req.body
    modifiedCategory.id = idCategory

    await categoryNewsRepository.updateCategory(modifiedCategory)
    res.status(200).send(modifiedCategory)
  } catch(error) {
    next(error)
  }
})

categoryNews.delete('/news-api/v1/categorias/:id', async (req, res, next) => {
  try {
    const idCategory = req.params.id
    await categoryNewsRepository.removeCategoryById(idCategory)
    res.status(204).send('Categoria Removida')
  } catch(error) {
    next(error)
  }
})

categoryNews.delete('/news-api/v1/categorias', async (req, res, next) => {
  await categoryNewsRepository.removeAllCategories()
  res.status(204).send('Categorias Removidas')
})

module.exports = categoryNews