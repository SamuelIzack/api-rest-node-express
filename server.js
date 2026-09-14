import "dotenv/config";

import app from "./src/app.js";

const PORT = 3000;

// Inicia o servidor utilizando a aplicação Express
app.listen(PORT, () => {
    console.log("Servidor ok");
});
