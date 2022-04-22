const { default: mongoose } = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");
const { AllRoutes } = require("./routers/router");

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
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join()));
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run => http://localhost:${this.#PORT}`);
        })
    }
    connectToDB(){
        mongoose.connect(this.#DB_URL, (err) =>{
            if(!err) return console.log("connected to DB")
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandling(){
        this.#app.use((req, res, nex) => {
            return res.status(404).json({
                status: 404,
                message: "آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((err, req, res, next) =>{
            const status = err.status || 500;
            const message = err.message || "InternalServerError";
            return res.status(status).json({
                status,
                message
            })
        })
    }
}

