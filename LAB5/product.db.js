const fs = require('fs');

// Handle form submission (assuming you have a form with appropriate input fields)
function handleFormSubmission(event) {
  event.preventDefault();

  // Retrieve the entered review details from the form
  const username = document.getElementById('username').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;

  // Get the current comment data from comment.json
  const commentData = JSON.parse(fs.readFileSync('comment.json'));

  // Find the relevant product in commentData and add the new review
  const productId = 1; // Assuming you have a way to identify the product
  const productReviews = commentData.find((product) => product.productId === productId).reviews;
  const newReview = {
    id: productReviews.length + 1,
    username: username,
    rating: rating,
    comment: comment,
    date: new Date().toISOString().split('T')[0] // Capture the current date
  };
  productReviews.push(newReview);

  // Update the comment.json file
  fs.writeFileSync('comment.json', JSON.stringify(commentData));

  // Refresh the page to display the updated reviews
  location.reload();
}

// Attach the form submission handler to the form element
const form = document.getElementById('reviewForm');
form.addEventListener('submit', handleFormSubmission);


const products = [
  {
    id: 1,
    name: "Yellow Socks",
    image: "yellow_socks.png",
    description: "Comfortable and stylish yellow socks for everyday wear.",
    additionalInfo: "One size fits all. Made from high-quality cotton.",
    price: 9.99,
    category: "베스트",
  },
  {
    id: 2,
    name: "Blue Dress",
    image: "blue_dress.png",
    description: "Elegant blue dress for special occasions.",
    additionalInfo: "Available in various sizes. Made from premium fabric.",
    price: 49.99,
    category: "베스트",
  },
  {
    id: 3,
    name: "Nike Air Force",
    image: "nike_air_force.png",
    description: "Classic Nike Air Force sneakers in white.",
    additionalInfo: "Available in men's and women's sizes. Durable and comfortable.",
    price: 99.99,
    category: "베스트",
  },
  {
    id: 4,
    name: "Check Shirt",
    image: "check_shirt.png",
    description: "Stylish checkered shirt for a casual look.",
    additionalInfo: "Made from soft and breathable fabric. Suitable for all seasons.",
    price: 29.99,
    category: "베스트",
  },
  {
    id: 5,
    name: "Nike Air Force Colorful",
    image: "nike_air_force_colorful.png",
    description: "Vibrant and colorful Nike Air Force sneakers.",
    additionalInfo: "Stand out from the crowd with these eye-catching shoes.",
    price: 119.99,
    category: "신제품",
  },
  {
    id: 6,
    name: "Red Scarf",
    image: "red_scarf.png",
    description: "Warm and cozy red scarf for the winter season.",
    additionalInfo: "Made from soft and fluffy material. Perfect for cold weather.",
    price: 19.99,
    category: "신제품",
  },
  {
    id: 7,
    name: "Pink Bag",
    image: "pink_bag.png",
    description: "Stylish and spacious pink bag for everyday use.",
    additionalInfo: "Multiple compartments and adjustable straps. Made from durable materials.",
    price: 39.99,
    category: "신제품",
  },
  {
    id: 8,
    name: "Black Mini Dress",
    image: "black_mini_dress.png",
    description: "Sleek and chic black mini dress for a night out.",
    additionalInfo: "Flattering silhouette and high-quality craftsmanship.",
    price: 59.99,
    category: "신제품",
  },
  {
    id: 9,
    name: "Red Zimmerman Dress",
    image: "red_zimmerman_dress.png",
    description: "Sophisticated red Zimmerman dress for formal occasions.",
    additionalInfo: "Exquisite design and luxurious fabric.",
    price: 199.99,
    category: "출시예정",
  },
  {
    id: 10,
    name: "White Shoulder Bag",
    image: "white_shoulder_bag.png",
    description: "Elegant white shoulder bag for a polished look.",
    additionalInfo: "Versatile and spacious with multiple compartments.",
    price: 79.99,
    category: "출시예정",
  },
  {
    id: 11,
    name: "Underarmour Shorts",
    image: "underarmour_shorts.png",
    description: "High-performance Underarmour shorts for active individuals.",
    additionalInfo: "Moisture-wicking and breathable fabric. Ideal for sports and workouts.",
    price: 39.99,
    category: "출시예정",
  },
  {
    id: 12,
    name: "Leather Belt",
    image: "leather_belt.png",
    description: "Classic leather belt to complete any outfit.",
    additionalInfo: "Made from genuine leather with a timeless design.",
    price: 29.99,
    category: "출시예정",
  },
  {
    id: 13,
    name: "Red Tote Bag",
    image: "red_tote_bag.png",
    description: "Stylish and spacious red tote bag for everyday use.",
    additionalInfo: "Durable and versatile with a modern design.",
    price: 49.99,
    category: "기획전",
  },
  {
    id: 14,
    name: "Nude Heels",
    image: "nude_heels.png",
    description: "Elegant nude heels to elevate your style.",
    additionalInfo: "Comfortable and stylish for all-day wear.",
    price: 79.99,
    category: "기획전",
  },
  {
    id: 15,
    name: "Pink Dress",
    image: "pink_dress.png",
    description: "Feminine and charming pink dress for any occasion.",
    additionalInfo: "Flattering fit and delicate details.",
    price: 69.99,
    category: "기획전",
  },
  {
    id: 16,
    name: "Orange Pants",
    image: "orange_pants.png",
    description: "Stylish and vibrant orange pants to make a statement.",
    additionalInfo: "Made from high-quality fabric with a comfortable fit.",
    price: 49.99,
    category: "기획전",
  },
];

module.exports = {
  products,
};