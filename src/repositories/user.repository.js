const { client } = require("../database");
const { randomUUID } = require("crypto");


class UserRepository {

    constructor() {
        this.client = client;
    }

    async create({ name, username, email, password }) {
        const id = randomUUID();

        await this.client.query(
            "INSERT INTO USERS(ID, NAME, USERNAME, EMAIL, PASSWORD) VALUES($1, $2, $3, $4, $5)",
            [id, name, username, email, password]
        );
        const user = Object.assign({
            id,
            name,
            username,
            email, 
            password
        });
        return user;
    }

    async findAll() {
        const { rows } = await this.client.query("SELECT * FROM USERS");
        return rows;
    }

    async update({ name, username, email, password }, id) {
        const query = 
            'UPDATE USERS SET NAME = $1, USERNAME = $2, EMAIL = $3, PASSWORD = $4 WHERE ID = $5 ';
        await this.client.query(query, [name, username, email, password, id])
    }

    async findById(id) {
        const { rows } = await this.client.query(
            "SELECT * FROM USERS WHERE ID = $1 LIMIT 1", [id]
            );
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = UserRepository;