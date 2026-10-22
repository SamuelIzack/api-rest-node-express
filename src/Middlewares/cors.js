
function cors(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");

    if (req.method === "OPTIONS"){
        return res.sendStatus(204);
    }

    next();
}

export default cors;