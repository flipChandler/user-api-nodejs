const UserRepository = require("./repositories/user.repository");
const { createHmac } = require("crypto");


class User {

    constructor() {
        this.users = [];
        this.userRepository = new UserRepository();
    }

    async create(body) {
        const { password } = body;
        const pwdEncrypt = createHmac("sha256", password).digest("hex");
        const user = {
            ...body,
            password: pwdEncrypt,
        };
        return await this.userRepository.create(user);
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async update(body, id) {
        const userExists = await this.userRepository.findById(id);
        if (!userExists) {
            throw new Error("Usuário não encontrado!");
        }
        const { password } = body;
        const pwdEncrypt = createHmac("sha256", password).digest("hex");
        const user = {
            ...body,
            password: pwdEncrypt,
        };

        await this.userRepository.update(user, id);
    }
}


module.exports = new User();