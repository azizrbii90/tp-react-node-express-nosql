const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db')

connectDB(process.env.DB_URL);

app.listen(PORT, console.log(`server running on ${PORT}`))