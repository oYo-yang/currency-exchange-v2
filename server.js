import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import currencyApi from './api/currency.js'
import userApi from './api/user.js'
import watchlistApi from './api/watchlist.js'

const swaggerDocument = YAML.load('./docs/swagger.yaml')
const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

currencyApi(app)
userApi(app)
watchlistApi(app)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
  console.log('Swagger running on http://localhost:3000/api-docs')
})
