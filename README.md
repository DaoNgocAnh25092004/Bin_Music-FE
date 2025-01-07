# Bin Store - Clothing E-commerce Website

**Welcome to Bin Store!**  
Bin Store is an e-commerce platform that specializes in selling a wide range of clothing and fashion accessories for men, women, and children. Our aim is to provide a seamless online shopping experience with the latest trends in fashion, offering both casual and formal wear to cater to every style preference.

## Features

### 1. User-Friendly Interface

- A clean, responsive design that works across all devices, including desktops, tablets, and mobile phones.
- Intuitive navigation with easy access to product categories, search functionality, and filters for size, color, and price.

### 2. Product Management

- **Product Categories:** Offers a wide range of categories such as Men's Wear, Women's Wear, Kids' Wear, Accessories, and Seasonal Specials.
- **Product Pages:** Detailed product descriptions, multiple high-quality images, available sizes, and color options. Each product page includes customer reviews and a related products section.
- **Stock Management:** Real-time inventory tracking for products to ensure customers see accurate stock levels.

### 3. Shopping Cart & Checkout

- A dynamic shopping cart that updates in real time as users add or remove products.
- **Multiple Payment Options:** Secure payment gateways including credit/debit cards, PayPal, and online banking.
- **Discounts and Promotions:** Users can apply discount codes during checkout and see the price reductions immediately.
- **Order Tracking:** Customers can track their orders from dispatch to delivery via a tracking number provided post-purchase.

### 4. User Accounts

- **User Registration/Login:** Customers can register for an account, log in, and save their shipping and billing information for faster checkout.
- **Order History:** A personal dashboard for customers to view past purchases, reorder products, and manage shipping addresses.
- **Wishlist Feature:** Users can save items to a wishlist for future purchases.

### 5. Admin Panel

- **Product Management:** Admins can easily add, edit, or remove products, including pricing, stock levels, and product descriptions.
- **Order Management:** A comprehensive dashboard that allows admin to manage orders, process refunds, and handle customer queries.
- **Customer Management:** Admins can manage customer accounts, view purchase histories, and resolve issues efficiently.

### 6. Security Features

- **Data Encryption:** Secure HTTPS protocols and SSL certificates for safe browsing and transactions.
- **User Authentication:** Two-factor authentication for admin accounts and encrypted passwords for user accounts.
- **Payment Security:** Integration with trusted payment providers to ensure the safety of credit card transactions and sensitive data.

### 7. SEO & Marketing Tools

- **SEO Optimized:** Meta tags, product descriptions, and images are optimized for search engines to drive organic traffic.
- **Email Marketing Integration:** Allows the collection of user emails for newsletters, promotions, and order confirmations.
- **Social Media Integration:** Customers can share products directly on social media platforms like Instagram, Facebook, and Twitter.

## Installation

### Prerequisites

To set up this project, you will need the following software installed on your system:

- Node.js (v14 or above)
- NPM (v6 or above)
- MongoDB (for database management)
- Git (for version control)

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/DaoNgocAnh25092004/Bin-Store.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bin-store
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables. Create a .env file and include the following:

   ```bash
   MONGO_URI=your-mongodb-uri
   PORT=3001
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET=your-stripe-secret
   ```

5. Run the application in development mode:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to http://localhost:3001 to see the application.

## Technology Stack

### Frontend:

- React.js (for a responsive and dynamic user interface)
- Redux (for state management)
- Bootstrap (for styling)

### Backend:

- Node.js & Express.js (for server-side development)
- MongoDB (for database management)
- Mongoose (for object data modeling)

### Payment Integration:

- Stripe API (for handling payments)

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any queries or issues, please reach out to our support team:

- Email: daongocanh25092004@gmail.com
- Phone: [+84353707544](tel:+84353707544)

Happy Shopping with **Bin Store!** ✨
