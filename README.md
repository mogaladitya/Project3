## 🛒 Mock E-Commerce Cart App

A simple **full-stack shopping cart application** built for **Vibe Commerce’s coding challenge**.
It demonstrates **React + Redux** frontend, **Node/Express** backend, and **MongoDB** integration to manage products, cart items, and a mock checkout process.

---

### Overview

> Frontend and backend communicate via REST APIs.

---

## ⚙️ Tech Stack

| Layer         | Technology                                                                     |
| ------------- | ------------------------------------------------------------------------------ |
| **Frontend**  | React , Redux Toolkit, React Router, React Hot Toast, Tailwind CSS 
| **Backend**   | Node.js, Express.js                                                            |
| **Database**  | MongoDB with Mongoose ORM                                                      |
| **Utilities** | CORS, dotenv, body-parser                                                      |
| **UI Icons**  | react-icons                                                                    |

---

## 🧩 Features

### 🖥️ Frontend

* Responsive product grid with “Add to Cart” / “Remove Item” buttons
* Cart page with:

  * Item list
  * Quantity & total calculation
  * Remove items
  * Checkout button
* Checkout flow with mock receipt
* Clean Tailwind UI + Toast notifications

### ⚙️ Backend APIs

| Method     | Endpoint        | Description                     |
| ---------- | --------------- | ------------------------------- |
| **GET**    | `/api/products` | Fetch all mock products         |
| **POST**   | `/api/cart`     | Add a product to the cart       |
| **GET**    | `/api/cart`     | Get all cart items + total      |
| **DELETE** | `/api/cart/:id` | Remove a specific cart item     |
| **POST**   | `/api/checkout` | Mock checkout → returns receipt |

---

## 📁 Folder Structure

```
root/
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   └── CartItem.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── checkoutController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── checkoutRoutes.js
│   └── data/
│       └── mockProducts.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Product.jsx
    │   │   └── CartItem.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── Cart.jsx
    │   ├── redux/
    │   │   ├── Slices/
    │   │   │   └── CartSlice.js
    │   │   └── Store.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── data.js
```

---

## 🧠 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mogaladitya/Project3.git
cd Project3
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file:

```env
MONGO_URI=mongodb url
PORT=5000
```

#### Start the backend server:

```bash
npm start
```

The server will run on:
👉 `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on:
👉 `http://localhost:3000`

---

## 🧰 Scripts

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm start`     | Start development server                             |
| `npm run build` | Build frontend for production                        |


