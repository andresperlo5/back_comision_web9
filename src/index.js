const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3001

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/productos', require('./routes/productos.routes'))
app.use('/usuarios', require('./routes/usuarios.routes'))
app.use('/servicios', require('./routes/servicios.routes'))

app.listen(port, () => {
  console.log("Servidor andando en el puerto", port)
}) 
