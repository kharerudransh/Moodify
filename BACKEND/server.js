require("dotenv").config();

const app = require("../BACKEND/src/app");
const connectTodb=require("./src/config/database")

connectTodb();
app.listen(3000, () => {
    console.log(`Server is running on port 3000 `)
})