// Loading Modules
  const express = require('express')
  const handlebars = require('express-handlebars')
  const bodyParser = require('body-parser')
  const app = express()
  const admin = require('./routes/admin')
  const path = require('path')
  const mongoose = require('mongoose')
  const session = require('express-session')
  const flash = require('connect-flash')
// Configs
  // Session
  app.use(session({
    secret: 'cursodenone',
    resave: true,
    saveUninitialized: true
  }))
  app.use(flash())
  // Middlaware
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('succcess_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
  })
  //body parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
  //bodyparser
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');
  //Mongoose
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true 
  }).then(() => {
      console.log('Mongoose conected...');
    }).catch((err) => {
      console.log('erro ao se conectar: '+err);
    })
  //Public
    app.use(express.static(path.join(__dirname, "public")))


// Routes
  app.use('/admin', admin)
// Others
const PORT = 8081
app.listen(PORT, () => {
  console.log('Servidor Rodando!')
})

