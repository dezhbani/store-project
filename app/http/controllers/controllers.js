const autoBind = require("auto-bind");

class Controllers{
    constructor(){
        autoBind(this)
    }
    testMethod(){
        return "test string"
    }
}

module.exports ={
    Controllers
}