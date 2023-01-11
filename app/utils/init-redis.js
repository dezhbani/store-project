const redisDB = require("redis");
const redisClient = redisDB.createClient();
// redisClient.connect();
// redisClient.on("connect", () => console.log("connect to redis"))
// redisClient.on("error", (err) => console.log("redis error: ", err.message ))
// // redisClient.on("ready", () => console.log("connected to redis & ready to use..."))
// redisClient.on("end", () => console.log("disconnected to from redis..."))

module.exports = redisClient