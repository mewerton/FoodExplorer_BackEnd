const knex = require("../database/knex")

class ProductsController{
    async create(request, response){
        const {title, description, ingredients, value, category} = request.body
        const user_id = request.user.id

        const product_id =  await knex("products").insert({
            title,
            description,
            value,
            category,
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

        return response.json()
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

    async index(request, response){
        const { title, ingredients } = request.query

        let products

        if(ingredients){
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

            products = await knex("ingredients")
            .select([
                "products.id",
                "products.title"
            ])
            .whereLike("products.title",`%${title}%`)
            .whereIn("name", filterIngredients)
            .innerJoin("products", "products.id", "ingredients.product_id")
            .orderBy("products.title")

        }else{
            products = await knex("products").whereLike("title", `%${title}%`)
        }

        const userIngredients = await knex("ingredients")
        const productsWithIngredients = products.map(product => {
            const productIngredients = userIngredients.filter( ingredient => ingredient.product_id === product.id)

            return {
                ...product,
                ingredients: productIngredients
            }
        })

        return response.json(productsWithIngredients)
    }
}

module.exports = ProductsController

// Não foi feito o UPDATE em ProductsController, é necessário fazer