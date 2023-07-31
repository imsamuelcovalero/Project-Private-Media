/* Def: models.js */
const mongoose = require('mongoose');

// Esquema do usuário
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cashback_value: { type: Number, required: false }
});

// Esquema do produto
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  url_image: { type: String, required: false }
});

// Esquema de pontos de retirada
const WithdrawalPointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
});

// Esquema de vendas
const SaleSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_price: { type: Number, required: true },
  pick_up_place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'WithdrawalPoint', required: true },
  sale_date: { type: Date, required: true },
});

// Esquema de produtos por venda
const ProductSaleSchema = new mongoose.Schema({
  sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

// Criar modelos a partir dos esquemas
const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const WithdrawalPoint = mongoose.model('WithdrawalPoint', WithdrawalPointSchema);
const Sale = mongoose.model('Sale', SaleSchema);
const ProductSale = mongoose.model('ProductSale', ProductSaleSchema);

module.exports = {
  User,
  Product,
  WithdrawalPoint,
  Sale,
  ProductSale
};