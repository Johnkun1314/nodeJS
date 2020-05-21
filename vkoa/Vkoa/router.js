const fs = require('fs')
const path = require('path')

module.exports = class Router {
    constructor() {
        this.list = []
    }
    routes() {
        return async (ctx, next) => {
            let url = ctx.url
            let method = ctx.method
            let fn
            this.list.map(item => {
                if (item.path === url && item.method === method) {
                    // find = true
                    console.log('find')
                    fn = item.fn
                }
            })
            if(fn){
                 await fn(ctx,next)
                 console.log(ctx.body)
                 console.log('await')
            }
           
        }
    }
    regist(path, method, fn) {
        this.list.push({
            path,
            method,
            fn
        })
    }
    get(path, fn) {
        this.regist(path, 'get', fn)
    }
    post(path, fn) {
        this.regist(path, 'post', fn)
    }
}
// path  method  fn