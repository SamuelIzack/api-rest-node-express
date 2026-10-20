
function responder(res, status, dados, extras = {}) {
    return res.status(status).json({...extras, dados})
}

export default responder;