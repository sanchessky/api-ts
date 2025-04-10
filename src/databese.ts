// importação da biblioteca do mysql/promisse para estabelecer a conexão com o banco de dados.
import mysql from "mysql2/promise"
// A constante connect é uma conexão com o banco de dados. Com ela iremos criar a conexão com o mysql passando alguns parâmetros, tais como: 
// - Host(local onde está o banco de dados) 
// - User(usuaário do bando de dados)
// - Password(senha de acesso do banco de dados)
// - Database(nome do banco de dados)
// - Port(porta de comunicação do banco de dados)
const connect = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "dbts",
    port: 3306
});
export default connect;
