

const app = require("./app/app");
require('dotenv').config();

const port = process.env.PORT || 4201;

app.listen(port, () => {
    console.log(`----------------Servidor en puerto ${port}----------------`);
});

