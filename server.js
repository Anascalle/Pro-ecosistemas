const app = require("./src/index");
const port = 5050;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
