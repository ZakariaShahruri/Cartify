# 🛒 Cartify — Full-Stack E-Commerce Platform

A production-ready, Amazon-inspired e-commerce platform built as a monorepo with a modern tech stack.

---

## 🏗️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | Next.js 14, TypeScript, Tailwind CSS |
| Backend    | Spring Boot 3, Java 21               |
| Database   | PostgreSQL 15                        |
| Auth       | JWT (Spring Security)                |
| ORM        | Spring Data JPA / Hibernate          |

---

## 📁 Monorepo Structure

```
cartify/
├── frontend/          # Next.js 14 App Router
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   │   ├── page.tsx           # Home / product listing
│   │   │   ├── products/[id]/     # Product detail
│   │   │   ├── cart/              # Shopping cart
│   │   │   └── checkout/          # Checkout flow
│   │   ├── components/
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   ├── product/   # ProductCard, ProductGrid
│   │   │   └── ui/        # Button, Badge, Spinner
│   │   ├── hooks/         # useProducts, useCart
│   │   ├── lib/           # api.ts (fetch wrapper)
│   │   └── types/         # Shared TypeScript types
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/           # Spring Boot 3 REST API
│   └── src/main/java/com/cartify/
│       ├── controller/    # REST endpoints
│       ├── service/       # Business logic
│       ├── repository/    # JPA repositories
│       ├── model/         # JPA entities
│       ├── dto/           # Request/Response DTOs
│       └── config/        # Security, CORS, Swagger
│
└── docker-compose.yml # PostgreSQL + pgAdmin
```

---

## 🗄️ Database Schema

```sql
-- Users
users (id, email, password_hash, full_name, role, created_at)

-- Products
products (id, name, description, price, stock_quantity, 
          image_url, category_id, rating_avg, rating_count, created_at)

-- Categories
categories (id, name, slug)

-- Orders
orders (id, user_id → users, status, total_amount, 
        shipping_address, created_at, updated_at)

-- Order Items
order_items (id, order_id → orders, product_id → products, 
             quantity, unit_price)

-- Reviews
reviews (id, user_id → users, product_id → products, 
         rating, comment, created_at)
```

---

## 🚀 Quick Start

### 1. Start the Database
```bash
docker-compose up -d
```

### 2. Run the Backend
```bash
cd backend
./mvnw spring-boot:run
# API available at http://localhost:8080
# Swagger UI at http://localhost:8080/swagger-ui.html
```

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/products`             | List products (paginated)|
| GET    | `/api/products/{id}`        | Get product by ID        |
| GET    | `/api/products/category/{slug}` | Filter by category  |
| POST   | `/api/auth/register`        | Register user            |
| POST   | `/api/auth/login`           | Login → JWT token        |
| GET    | `/api/orders`               | User's orders (auth)     |
| POST   | `/api/orders`               | Place order (auth)       |

---

## 🌐 Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Backend** (`application.properties`):
```
spring.datasource.url=jdbc:postgresql://localhost:5432/cartify
spring.datasource.username=cartify_user
spring.datasource.password=cartify_pass
jwt.secret=your-256-bit-secret
```
