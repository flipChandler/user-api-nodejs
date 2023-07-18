const user = require("../user");

class UserController {

    post(request, response) {
        request.on("data", async (data) => {
            console.log("PASSOU AQUI");
            const body = JSON.parse(data);
            const result = await user.create(body);
            return response.end(JSON.stringify(result));
        });
    }

    async get(request, response) {
        const result = await user.findAll();
        return response.end(JSON.stringify(result));
    }

    put(request, response) {
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
    }
}

module.exports = { UserController }