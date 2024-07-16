const express = require('express');
const mongoose = require('mongoose'); //requerir mongoose
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const roleRoutes = require('./routes/roleRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const cors = require('cors'); //requerir cors

const app = express();

// Middleware para procesar bodies JSON
app.use(express.json());



app.use(cors());

//conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/serendipity');

// Rutas de usuario
app.use('/api/users', userRoutes);

// Rutas de productos
app.use('/api/products', productRoutes);

// Rutas de categorías
app.use('/api/categories', categoryRoutes);

// Rutas de roles
app.use('/api/roles', roleRoutes);

// Rutas de compras
app.use('/api/purchases', purchaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

//app.listen(port, () => {
 //   console.log('Me ejecuto en el puerto ' + port);
//});

