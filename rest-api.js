// REST API

module.exports = function (server, MenuItem, Menu, Customer) {

    // menuitems

    // GET (read, select) all
    server.get('/data/menu-items', async (request, response) => {
        let result = await MenuItem.find()
        response.json(result)
    })

    // GET (read, select) one item
    // http://localhost:3000/data/menu-items/2
    server.get('/data/menu-items/:id', async (request, response) => {
        let result = await MenuItem.findById(request.params.id)
        response.json(result)
    })


    // POST (create, insert)
    server.post('/data/menu-items', async (request, response) => {
        let item = new MenuItem(request.body)
        let result = await item.save()
        response.json(result)
    })

    // PUT (update, update)
    server.put('/data/menu-items/:id', async (request, response) => {
        let item = await MenuItem.findById(request.params.id)
        Object.assign(item, request.body)
        let result = await item.save()
        response.json(result)
    })


    // DELETE (delete, delete)
    server.delete('/data/menu-items/:id', async (request, response) => {

    })

    // menu

    // GET (read, select) all
    server.get('/data/menu', async (request, response) => {
        let result = await Menu.find()
        response.json(result)
    })

    // GET (read, select) one item
    // http://localhost:3000/data/menu/62306aab6d2c577222972441

    server.get('/data/menu/:id', async (request, response) => {
        let item = await Menu.findById(request.params.id).populate('menuitems').exec()
        response.json(item)
    })


    // POST (create, insert)
    server.post('/data/menu', async (request, response) => {
        let item = new Menu(request.body)
        let result = await item.save()
        response.json(result)
    })

    // PUT (update, update)
    server.put('/data/menu/:id', async (request, response) => {
        let item = await Menu.findById(request.params.id)
        Object.assign(item, request.body)
        let result = await item.save()
        response.json(result)
    })


    // DELETE (delete, delete)
    server.delete('/data/menu/:id', async (request, response) => {

    })

    // registration
    server.post('/data/customer', async (request, response) => {
        let item = new Customer(request.body)
        let result = await item.save()
        response.json(result)
    })

    // authentication

    server.post('/data/login', async (request, response) => {
        let result = await Customer.findOne({
            email: request.body.email,
            password: request.body.password
        })            
        if (result) {
            request.session.customer = result
            response.json({ loggedIn: true })
        } else {
            delete (request.session.customer)
            response.json({ loggedIn: false })
        }
    })

    server.get('/data/login', async (request, response) => {
        if (request.session.customer) {
            let result = await Customer.findOne({
                email: request.session.customer.email,
                password: request.session.customer.password
            }) 
            if (result) {
                response.json({
                    firstname: request.session.customer.firstname,
                    lastname: request.session.customer.lastname,
                    email: request.session.customer.email
                })

            } else {
                response.json({ loggedIn: false })
            }

        } else {
            response.json({ loggedIn: false })
        }
    })


    server.delete('/data/login', async (request, response) => {
        delete (request.session.customer)
        response.json({ loggedIn: false })
    })

}