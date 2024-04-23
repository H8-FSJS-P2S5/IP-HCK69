const express = require('express')
const app = express()
const Controller = require('./controllers/controller');
const { authentication } = require('./middlewares/authentication');
const { errHandler } = require('./middlewares/errHandler');
const port = process.env.PORT || 3100
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require('cors');
app.use(cors())

app.use(express.json());

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.post('/google-login', Controller.googleLogin)

app.get('/field', Controller.field)
app.get('/field/:id', Controller.fieldId)

app.use(authentication)

app.post('/booked/:id', Controller.booked)
app.get('/bookeduser', Controller.bookeduser)
app.get('/my-booking', Controller.myBook)
app.patch('/payment', Controller.payment)

app.use(errHandler)
app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });