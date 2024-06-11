const errorHandler = (err, req, res, next) => {    
    if (err.name.includes("MongoServerError") && err.message.includes("duplicate key error")) {        
        res.status(400).json({error: "`username` is expected to be unique"});
        return;
    } else if (err.name.includes("ValidationError") && err.message.includes("username: minLength validation failed")) {
        res.status(400).json({error: "`username` is expected to be at least 3 characters long"});
        return;
    }
    next(err);
};

module.exports = errorHandler;