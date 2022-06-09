const db = require('../db/config')
const Category = require('../models/category.news.model')

class categoryNewsRepository {
  async getAllCategoryNews() {
    const query = `
      SELECT * FROM categorias
    `

    const { rows } = await db.query(query)

    return rows || []
  }

  async getCategoryNewById(id) {
    try {
      const query = `
        SELECT id, nome
        FROM categorias
        WHERE id = $1
      `

      const values = [id]

      const { rows } = await db.query(query, values)
      const [ category ] = rows

      return category || []
    } catch (error) {
      next(error)
    }
  }

  async getNewsByCategoryId(id_category) {
    try {
      const query = `
      SELECT titulo
      FROM noticia WHERE
      id_categoria = $1
    `

      const values = [id_category]
      const { rows } = await db.query(query, values)

      const [ newsCategory ] = rows
      return newsCategory || []
    } catch(error) {
      next(error)
    }
  }

  async createCategory(category) {
    const script = `
    INSERT INTO categorias (
      nome
    ) VALUES (
      $1
    );
    `

    const values = [category.nome]

    const { rows } = await db.query(script, values)
    const [ newCategory ] = rows

    return newCategory
  }

  async updateCategory(category) {
    const script = `
      UPDATE categorias
      SET
        nome = $1
      WHERE id = $2  
    `

    const values = [category.nome, category.id]

    await db.query(script, values)
  }

  async removeCategoryById(id) {
    const script = `
      DELETE FROM categorias
      WHERE id = $1
    `

    const values = [id]

    await db.query(script, values)
  }

  async removeAllCategories() {
    const script = `
      TRUNCATE TABLE categorias
    `

    await db.query(script)
  }
}

module.exports = new categoryNewsRepository()