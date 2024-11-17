import v1Router from '../api/v1/routes/routes.index.js'

const apiVersioning = (req,res,next) => {
    // this middleware read inside the header request the version of the api and call
    // the correct router
    const apiVerison = req.headers['api-version'] || 'v1'
    let router
    switch(apiVerison){
        case 'v1':
            router = v1Router
            break;
        default:
            'v1'
    }

    router(req,res,next);
}

export default apiVersioning