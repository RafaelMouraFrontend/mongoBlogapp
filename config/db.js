if(process.env.NODE_ENV == 'production'){
  module.exports = {mongoURI: 'mongodb://moura:odi123web@cluster0-shard-00-00-8zgqm.mongodb.net:27017,cluster0-shard-00-01-8zgqm.mongodb.net:27017,cluster0-shard-00-02-8zgqm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'}
}else{
  module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}



