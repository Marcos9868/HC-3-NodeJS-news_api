const db = require('../db/config')
const News = require('../models/news.model')

class newsRepository {
  async getAllNews() {
    const query = `
      SELECT * FROM noticia
    `

    const { rows } = await db.query(query)

    return rows || []
  }

  async getNewsById(id) {
    const query = `
      SELECT id, titulo, conteudo
      FROM noticia WHERE 
      id = $1 
    `

    const values = [id]

    const { rows } = await db.query(query, values)
    const [ getnews ] = rows

    return getnews || []
  }

  async createNews(news) {
    const script = `
    INSERT INTO noticia (
      titulo, conteudo, id_categoria
    ) VALUES (
      $1,
      $2,
      $3
    );
    `

    const values = [news.titulo, news.conteudo, news.id_categoria]

    const { rows } = await db.query(script, values)
    const [ newNews ] = rows

    return newNews
  }

  async updateNewsById(news) {
    const script = `
      UPDATE noticia
      SET
        titulo = $1,
        conteudo = $2
      WHERE id = $3  
    `

    const values = [news.titulo, news.conteudo, news.id]

    await db.query(script, values)
  }

  async removeNewsById(id) {
    const script = `
      DELETE FROM noticia
      WHERE id = $1
    `

    const values = [id]

    await db.query(script, values)
  }

  async removeAllNews() {
    const script = `
      TRUNCATE TABLE noticia
    `

    await db.query(script)
  }
}

module.exports = new newsRepository()