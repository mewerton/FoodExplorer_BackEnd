const { Router, response } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ProductsController = require('../controllers/ProductsController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()

//productsRoutes.use(ensureAuthenticated)

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", ensureAuthenticated, productsController.create)
productsRoutes.get("/:id", productsController.show)
productsRoutes.delete("/:id", ensureAuthenticated, productsController.delete)
productsRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"),(request, response) => {
    console.log(request.file.filename)
    response.json()
})


module.exports = productsRoutes