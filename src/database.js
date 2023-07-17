const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "api_sem_framework_db",
    user: "felipe",
    password: "password",
});

client.connect();

// exporta o client do postgres para outros arquivos .js
module.exports = {
    client,
}

// client.query("SELECT * FROM USERS", (err, res) => {
//     console.log("Success", res);
//     client.end();
// });