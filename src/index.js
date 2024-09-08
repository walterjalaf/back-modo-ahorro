

const app = require("./app/app")
const port = process.env.port || 4201;

app.listen(port, () => {
    console.log(`----------------Servidor en puerto ${port}----------------`);
});

