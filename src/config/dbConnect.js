import dns from "node:dns";
import mongoose from "mongoose";

// Define servidores DNS alternativos para evitar problemas de resolução 
// de domínio durante a conexão com o MongoDB.
dns.setServers(["1.1.1.1", "8.8.8.8"]);


async function conectaNaDB() {

    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectaNaDB; 