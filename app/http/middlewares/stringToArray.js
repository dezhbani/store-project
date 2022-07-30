const stringToArray = (...args) =>{
    return function(req, res, next){
        const fields = args;
        fields.forEach(field => {  
            if(req.body[field]){
                if(typeof req.body[field] == "string"){
                    if(req.body[field].indexOf("#") >=0){
                        req.body[field] = req.body[field].split("#").map(item => item.trim());
                    }else if(req.body[field].indexOf(",") >=0){
                        req.body[field] = req.body[field].split(",").map(item => item.trim());
                    }else{ 
                        req.body[field] = [req.body[field]]
                    }
                }else if((req.body[field].constructor).toString().toLowerCase().indxOf("array") >= 0){
                    req.body[field] = req.body[field].map(item => item.trim())
                }
            }else{
                req.body[field] = [];
            }
        })
        next()
    }
}

module.exports = {
    stringToArray
}