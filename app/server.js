const { default: mongoose } = require("mongoose");
const express = require("express");
const http = require("http");
require("dotenv").config();
const path = require("path");
const { AllRoutes } = require("./routers/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJS = require("swagger-jsdoc");
const cors = require("cors");
const expressEjsLayouts = require("express-ejs-layouts");
const { initSocket } = require("./utils/init-socket");
const { socketHandler } = require("./socket.io");

module.exports = class Application{
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT, DB_URL){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.initTemplateEngine()
        // this.initRedis();
        this.connectToDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));  
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJS({
            swaggerDefinition: {
                        openapi: "3.0.0",
                        info:{
                            title: "Store Project",
                            version: "2.0.0",
                            description: "پروژه فروش محصولات",
                            contact: {
                                name: "Matin Dezhbani",
                                email: "dezhbanimatin@gmail.com"
                            }
                        },
                        servers:[
                            {
                                url: "https://socketio-chat.iran.liara.run"
                            }
                        ],
                        components: {
                            securitySchemes:{
                                BearerAuth:{
                                    type: "http",
                                    scheme: "bearer",
                                    bearerFormat: "JWT"
                                }
                            }
                        },
                        security: [{BearerAuth: []}]
                    },
                    apis: ["./app/routers/**/*.js"]
                }),
                {explorer:true}
            )
        )
    }
    createServer(){
        const server = http.createServer(this.#app)
        const io = initSocket(server);
        socketHandler(io)
        server.listen(this.#PORT, () => {
            console.log(`run => http://localhost:${this.#PORT}/api-doc`);
        })
    }
    connectToDB(){
        mongoose.connect(this.#DB_URL, (error) => {
        if (!error) return console.log("conected to MongoDB");
        return console.log(error);
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
    initRedis(){
        require("./utils/init-redis")
    }
    initTemplateEngine(){
        this.#app.use(expressEjsLayouts);
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "resource/views");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);
        this.#app.set("layout", "./layouts/master");
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandling(){
        this.#app.use((req, res, next) => {
                next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        })
        this.#app.use((err, req, res, next) =>{
            const serverError = createError.InternalServerError("InternalServerError")
            console.log(err)
            const status = err.status || serverError.status;
            const message = err.message || serverError.message;
            return res.status(status).json({
                status,
                message
            })
        })
    }
}

