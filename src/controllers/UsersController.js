class UsersController{
    create(request, response){
        const {name, email, password} = request.body

        response.json({name, email, password})
    }

}

module.exports = UsersController

// index - GET
// show - GET 
// Create - POST
// update - PUT
// delete  - DELETE