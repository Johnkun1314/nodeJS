const fs = require('fs')

module.exports = function static(path) {
    return async (ctx, next) => {
        let {
            url,
            method
        } = ctx
        if(url == '/')
        url = '/index.html'
        await new Promise((resolve,reject)=>{
            console.log(url)
            fs.readFile(path + url, (err, data) => {
                console.log('static')
                if (err) {
                    resolve(0)
                } else {
                    ctx.body = data
                    resolve(1)
                }
    
            })
        })

    }
}