const http = require("http");
const user = require("./user");


const server = http.createServer(async (request, response) => {

    const METHOD = request.method;
    const URL = request.url;

    if (URL.startsWith("/users")) {
        switch (METHOD) {
            case "POST":
                request.on("data", async (data) => {
                    console.log("PASSOU AQUI");
                    const body = JSON.parse(data);
                    const result = await user.create(body);
                    return response.end(JSON.stringify(result));
                });
                break;
            case "GET":
                    const result = await user.findAll();
                    console.log("index", result);
                    return response.end(JSON.stringify(result));
        
                break;
            case "PUT":
                const paramSplit = URL.split("/");
                const id = paramSplit[2];

                request.on("data", async (data) => {
                    // receber as informações que quero alterar do nosso body
                    const body = JSON.parse(data);

                    try {
                        await user.update(body, id);
                        return response.end(
                            JSON.stringify({
                                message: "Usuário alterado com sucesso!",
                            })
                        );
                    } catch (error) {
                        return response.end(
                            JSON.stringify({
                                message: error.message
                            })
                        );
                    }
                });
                break;
        }
    }
});


server.listen(3000, () => console.log("Servidor está rodando!"));

process.on("uncaughtException", (err) =>
    console.log(`Erro no servidor ${err}`)
);
