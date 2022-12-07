const { Router } = require("express")

const usersRouter = require("./users.routes")
const productsRouter = require("./products.routes")
const ingredientsRoutes = require("./ingredients.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/products", productsRouter)
routes.use("/ingredients", ingredientsRoutes)

module.exports = routes