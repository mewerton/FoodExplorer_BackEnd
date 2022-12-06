const knex = require("../database/knex")

class ProductsController{
    async create(request, response){
        const {title, description, ingredients} = request.body
        const { user_id } = request.params

        const product_id =  await knex("products").insert({
            title,
            description,
            user_id
        })

        const ingredientsInsert = ingredients.map(name => {
            return{
                product_id,
                name,
                user_id
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        response.json()
    }

}

module.exports = ProductsController