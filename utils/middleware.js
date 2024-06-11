const errorHandler = (err, req, res, next) => {    
    if (err.name.includes("MongoServerError") && err.message.includes("duplicate key error")) {        
        res.status(400).json({error: "`username` is expected to be unique"});
        return;
    }
    next(err);
};

module.exports = errorHandler;