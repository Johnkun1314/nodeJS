const Vkoa = require('./Vkoa/index')
const fs = require('fs')
const path = require('path')


const Router = require('./Vkoa/router')
const static = require('./Vkoa/static')

const app = new Vkoa()
const router = new Router()

app.use(static(path.join(__dirname,'public')))
app.use(router.routes())


router.get('/', async (ctx,next) => {
    ctx.body = 'router get'
})

router.post('/public', async (ctx) => {
   
    ctx.body = 'router post'
})



app.listen(3000, () => {
    console.log('listen at 3000')
})


