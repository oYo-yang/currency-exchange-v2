# Currency Exchange API

This project is for training/demo purposes only.

## .env Setup

Create a `.env` file in the project root with the following content:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=currency
JWT_SECRET=your_jwt_secret
```

- Change the values to match your MySQL and JWT settings.

## Install and Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open Swagger API docs:

   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Notes

- Database schema: see `docs/createTable.sql`
- API docs: see `docs/swagger.yaml`
