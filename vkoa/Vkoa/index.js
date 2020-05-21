const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Vkoa {
    constructor() {
        this.fnList = []
    }
    use(fn) {
        this.fnList.push(fn)
    }
    listen(port, fn) {
        const server = http.createServer(async (req, res) => {
            const ctx = this.createContext(req, res)
            const url = ctx.url
            const fn = this.compose(this.fnList)
             fn(ctx)

            res.end(ctx.body)
        })
        server.listen(port, fn)
    }
    compose(fnList) {
        return (ctx) => {
            return toNext(0)

            function toNext(i) {
                let fn = fnList[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, () => {
                      return  toNext(i + 1)
                    })
                )

            }
        }

    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Vkoa