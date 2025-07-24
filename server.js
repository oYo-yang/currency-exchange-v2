import bodyParser from 'body-parser'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import currencyRoutes from './src/routes/currencyRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import watchlistRoutes from './src/routes/watchlistRoutes.js'

const swaggerDocument = YAML.load('./docs/swagger.yaml')
const app = express()

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/currency', currencyRoutes)
app.use('/user', userRoutes)
app.use('/watchlist', watchlistRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
  console.log('Swagger running on http://localhost:3000/api-docs')
})
