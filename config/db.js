if(process.env.MONGOLAB_URI == 'production'){
  module.exports = {mongoURI: 'mongodb+srv://rafaelmoura:odi123web@cluster0-besew.mongodb.net/test?retryWrites=true'}
}else{
  module.exports = {mongoURI:'mongodb://localhost/blogapp'}
}