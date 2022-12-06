const { Router } = require("express")

const ProductsController = require('../controllers/ProductsController')

const productsRoutes = Router()

const productsController = new ProductsController()

productsRoutes.post("/:user_id", productsController.create)


module.exports = productsRoutes