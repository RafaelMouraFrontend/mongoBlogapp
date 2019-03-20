if(process.env.NODE_ENV == "production"){
  module.exports = {mongoURI: "mongodb+srv://moura:odi123web@cluster0-usmpv.mongodb.net/test?retryWrites=true"}
}else{
  module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}



