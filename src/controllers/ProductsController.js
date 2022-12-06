const knex = require("../database/knex")

class ProductsController{
    async create(request, response){
        const {title, description, ingredients, value} = request.body
        const { user_id } = request.params

        const product_id =  await knex("products").insert({
            title,
            description,
            value,
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

    async show(request,response){
        const { id } = request.params

        const product = await knex("products").where({ id }).first()
        const ingredients = await knex("ingredients").where({ product_id: id}).orderBy("name")
        
        return response.json({
            ...product,
            ingredients
        })
    }

    async delete(request, response){
        const { id } = request.params

        await knex("products").where({ id }).delete()

        return response.json()
    }
}

module.exports = ProductsController