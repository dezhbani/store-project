const applications = require("./app/server")
new applications(1000, "mongodb://localhost:27017/store")