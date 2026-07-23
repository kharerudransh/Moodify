const Redis = require("ioredis").default
require("dotenv").config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
redis.on('connect', () => {
    console.log("redis is connected to server")
})
redis.on("error", (err) => {
    console.log("redis is not connected to server", err)
})
module.exports = redis;

//server ko redis se connect kara hai 