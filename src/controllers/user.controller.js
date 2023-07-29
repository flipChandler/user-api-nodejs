const user = require("../user");

class UserController {

    async post(request, response) {
        const { body } = request;
        const result = await user.create(body);
        return response.end(JSON.stringify(result));
    }

    async get(request, response) {
        const result = await user.findAll();
        return response.end(JSON.stringify(result));
    }

    async put(request, response) {
        const { body } = request;
        const { id } = request.params;
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
    }
}

module.exports = { UserController }