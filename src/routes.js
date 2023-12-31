const { UserController } = require("./controllers/user.controller")

const userController = new UserController();

const routes = [
    {
        url: "/users",
        method: "get",
        controller: userController.get
    },
    {
        url: "/users",
        method: "post",
        controller: userController.post
    },
    {
        url: "/users/:id",
        method: "put",
        controller: userController.put
    },
];

module.exports = routes;