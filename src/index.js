const http = require("http");
const { UserController } = require("./controllers/user.controller");

const userController = new UserController();


const server = http.createServer(async (request, response) => {

    const METHOD = request.method;
    const URL = request.url;

    if (URL.startsWith("/users")) {
        switch (METHOD) {
            case "POST":
                return userController.post(request, response);
                break;
            case "GET":
                return userController.get(request, response);        
                break;
            case "PUT":
                return userController.put(request, response);
                break;
        }
    }
});


server.listen(3000, () => console.log("Servidor está rodando!"));

process.on("uncaughtException", (err) =>
    console.log(`Erro no servidor ${err}`)
);
