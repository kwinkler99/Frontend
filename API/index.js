var express = require('express');
var app = express();
const fs = require('fs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.get('/', function(req, res) {
  const products = JSON.parse(fs.readFileSync('./products.json'))

  res.send(products)
});

app.get('/:id', function(req, res) {
  const id = req.params.id
  const products = JSON.parse(fs.readFileSync('./products.json'))
  const findProduct = products.filter(a => a.id === parseInt(id))

  res.send(findProduct)
});

app.delete('/:id', function(req, res) {
  const id = req.params.id
  const products = JSON.parse(fs.readFileSync('./products.json'))
  const deleteProduct = products.filter(a => a.id !== parseInt(id))

  fs.writeFileSync('./products.json', JSON.stringify(deleteProduct))

  res.send({
    deleteProduct: id
  })
})

app.put('/:id', function(req, res) {
  const id = req.params.id
  const products = JSON.parse(fs.readFileSync('./products.json'))
  console.log(req.body)
  const updateProduct = products.map(item => {
    if(item.id === id){
      return "cos"
    }
    else{
      return item
    }
  })
  res.send({
    post: id
  })
})

app.listen(5000, function() {
  console.log('Listening you on port 5000!');
})