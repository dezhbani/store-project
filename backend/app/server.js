const { default: mongoose } = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");
const { AllRoutes } = require("./routers/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJS = require("swagger-jsdoc");

module.exports = class Application{
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT, DB_URL){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.connectToDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));  
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJS({
            swaggerDefinition: {
                info:{
                    title: "Store Project",
                    version: "1.0.0",
                    description: "پروژه فروش محصولات",
                    contact: {
                        name: "Matin Dezhbani",
                        email: "dezhbanimatin@gmail.com"
                      }
                },
                servers:[
                    {
                        url: "http://localhost:1000"
                    }
                ]
            },
            apis: ["./app/routers/**/*.js"]
        })))
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run => http://localhost:${this.#PORT}`);
        })
    }
    connectToDB(){
        mongoose.connect(this.#DB_URL, (error) => {
            if (!error) return console.log("conected to MongoDB");
            return console.log(error.message);
        });
        mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
        });
        mongoose.connection.on("disconnected", () => {
        console.log("mongoose connection is disconnected");
        });
        process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("disconnected");
        process.exit(0);
        });
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandling(){
        this.#app.use((req, res, nex) => {
            next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        })
        this.#app.use((err, req, res, next) =>{
            const serverError = createError.InternalServerError("InternalServerError")
            const status = err.status || serverError.status;
            const message = err.message || serverError.message;
            return res.status(status).json({
                status,
                message
            })
        })
    }
}

