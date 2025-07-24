import dotenv from 'dotenv'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import currencyRouter from './api/currency.js'
import userRouter from './api/user.js'
import watchlistRouter from './api/watchlist.js'
dotenv.config()

const swaggerDocument = YAML.load('./docs/swagger.yaml')
const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/currency', currencyRouter)
app.use('/user', userRouter)
app.use('/watchlist', watchlistRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
  console.log('Swagger running on http://localhost:3000/api-docs')
})
