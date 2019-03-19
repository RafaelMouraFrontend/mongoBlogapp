if(process.env.NODE_ENV == 'production'){
  module.exports = require('./keys_dev')
}else{
  module.exports = {mongoURI:'mongodb://localhost/blogapp'}
}



