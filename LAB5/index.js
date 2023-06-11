const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { products } = require("./product.db");

const PORT = 3000;
const PRODUCT_DB_FILE = path.join(__dirname, 'product.db');
const COMMENT_FILE = path.join(__dirname, 'comment.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve the product description page
app.get('/product/:productId', (req, res) => {
  const productId = req.params.productId;
  // Load the product information from the database
  const product = getProductById(productId);
  if (product) {
    res.send(`
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="${product.title}" />
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
    `);
  } else {
    res.status(404).send('Product not found');
  }
});

// API endpoint to get filtered products based on search criteria
app.get('/api/products', (req, res) => {
  const { keyword = '', category = '' } = req.query;
  // Load all products from the database
  const products = getAllProducts();
  // Filter products based on search criteria
  const filteredProducts = products.filter((product) => {
    const matchesKeyword = (
      product.title.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
    );
    const matchesCategory = category === '' || product.category === category;
    return matchesKeyword && matchesCategory;
  });
  res.json(filteredProducts);
});

// API endpoint to add a new comment to a product
app.post('/api/comments', (req, res) => {
  const { productId, comment } = req.body;
  // Load existing comments from the comment file
  const comments = loadComments();
  // Add the new comment
  comments.push({ productId, comment });
  // Save the updated comments to the comment file
  saveComments(comments);
  res.sendStatus(200);
});

// Helper function to load all products from the database
function getAllProducts() {
  const productData = fs.readFileSync(PRODUCT_DB_FILE);
  return JSON.parse(productData);
}

// Helper function to get a product by ID from the database
function getProductById(productId) {
  const products = getAllProducts();
  return products.find((product) => product.id === productId);
}

// Helper function to load comments from the comment file
function loadComments() {
  try {
    const commentData = fs.readFileSync(COMMENT_FILE);
    return JSON.parse(commentData);
  } catch (error) {
    return [];
  }
}

// Helper function to save comments to the comment file
function saveComments(comments) {
  fs.writeFileSync(COMMENT_FILE, JSON.stringify(comments, null, 2));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
