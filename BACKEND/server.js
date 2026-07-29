require("dotenv").config();

const app = require("./src/app");
const connectTodb = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectTodb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});