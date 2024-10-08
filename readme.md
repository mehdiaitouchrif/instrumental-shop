# Instrumental Shop

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/react-v18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v3.2.2-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v14.16.1-green.svg)
![Mongoose](https://img.shields.io/badge/mongoose-v6.5.4-green.svg)

Instrumental Shop is an ecommerce platform for selling musical gears and instruments, mainly drums, pianos, and guitars. The website is built with the MERN stack and Tailwind CSS, and is designed to provide an easy and intuitive shopping experience for customers.

Here are a few preview image of the project:

![Homepage](https://github.com/mehdiaitouchrif/instrumental-shop/assets/112659075/7bb71f6d-8c21-4883-a073-b927fda5f164)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

Instrumental Shop offers the following features:

- User registration and authentication
- Product listing and searching
- Product detail pages with images, descriptions and features
- Shopping cart management
- Checkout process with secure payment integration (uses Stripe)
- Admin panel for managing products, orders, and customers
- Responsive design for mobile and desktop devices

![collectionpage](https://github.com/user-attachments/assets/38f11b3d-d9a0-4259-854d-b78ca7df91a7)

![Product Detail](https://user-images.githubusercontent.com/112659075/230420168-4da7b37d-6546-44f3-b2e3-f1ea51de8e26.png)

![Orders Management](https://github.com/mehdiaitouchrif/instrumental-shop/assets/112659075/f56ce560-2210-466a-9a84-e6f3b2bce346)

![Products Management](https://github.com/mehdiaitouchrif/instrumental-shop/assets/112659075/d27bb5e3-75a9-4366-982f-add3ed99074d)

![Edit Product](https://github.com/mehdiaitouchrif/instrumental-shop/assets/112659075/91b62b14-9ad5-4af6-a5c8-a41b1208542c)

![Account Management](https://github.com/mehdiaitouchrif/instrumental-shop/assets/112659075/893d33ad-94a2-45e2-a85b-8b52eb5c6e9c)

## Getting Started

To run Instrumental Shop on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/mehdiaitouchrif/instrumental-shop.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following environment variables:

```
   # setup
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000

   # databases
   MONGO_URI=<your mongodb connection url>
   REDIS_PASSWORD=<your redis password>
   REDIS_SOCKET_HOST=<your redis socket host>
   REDIS_SOCKET_PORT=12813

   # JWT
   JWT_SECRET=<generate a strong private key>
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30

   # cloudinary
   CLOUDINARY_CLOUD_NAME = <cloudinary cloud name>
   CLOUDINARY_API_SECRET=<cloudinary api secret>
   CLOUDINARY_API_KEY=<cloudinary api key>

   # SMTP
   SMTP_HOST=<ex. gmail>
   SMTP_PORT=<ex. 587 for gmail>
   SMTP_USER=<your email>
   SMTP_PASSWORD=<your email's password>
   FROM_EMAIL=noreply@instrumental.shop
   FROM_NAME=Instrumental Shop

   # payments
   STRIPE_PRIVATE_KEY=<your stripe private key>
   PAYPAL_CLIENT_ID=<your paypal client id>
```

4. Create .env in frontend (check .env.example in frontend)
5. Run the development server: `npm run dev`
   Run the frontend: `cd frontend && npm start`
6. Open your browser and go to `http://localhost:3000`

## Test Accounts

You can use the following test accounts to try out the features of Instrumental Shop:

### User Account

- Email: `sarah@example.com`
- Password: `123456`

### Admin Account

- Email: `admin@instrumental.com`
- Password: `123456`

## Contributing

Contributions to Instrumental Shop are welcome! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

Instrumental Shop is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
