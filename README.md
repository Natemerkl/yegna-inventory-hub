
# YEGNA Inventory Management System

A complete inventory management solution for small to medium-sized businesses. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚨 Important Setup Note

Before running the project, please manually add the following scripts to your `package.json` file:

```json
"dev": "vite",
"build:dev": "vite build --mode development"
```

These scripts are required for the application to build and run properly.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages Description](#pages-description)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Authentication](#authentication)
- [Contributing](#contributing)

## 🔍 Overview

YEGNA Inventory Management System helps businesses track their inventory, record sales, manage customers, and gain insights through analytics. The system provides a user-friendly interface for managing all aspects of inventory and sales operations.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of key metrics and recent activity
- **Product Management**: Add, edit, delete, and categorize products
- **Inventory Tracking**: Real-time tracking of stock levels
- **Sales Recording**: Track sales transactions with customer information
- **Analytics**: Visual reports and insights on inventory and sales
- **Responsive Design**: Works on desktop and mobile devices
- **User Management**: Manage user accounts and permissions

## 📱 Pages Description

### Authentication (src/pages/Auth.tsx)
- **Sign In/Sign Up**: User authentication page that allows users to create an account or log in
- **Features**: Email/password authentication, company name for registration
- **UI Elements**: Form with email, password inputs, and toggle between sign in/sign up modes

### Dashboard (src/pages/Dashboard.tsx)
- **Purpose**: Provides an overview of the business's key metrics
- **Features**: Sales summary, inventory status, recent activities
- **UI Elements**: Cards displaying metrics, charts for visual representation

### Products (src/pages/Products.tsx)
- **Purpose**: Listing and management of all products
- **Features**: 
  - View all products with search and filtering capabilities
  - Quick actions (view, edit, delete)
  - Add new products
- **UI Elements**: Table with product details, action buttons, search input

### Add Product (src/pages/AddProduct.tsx)
- **Purpose**: Form for adding new products or editing existing ones
- **Features**: 
  - Add product details (name, description, SKU, price, etc.)
  - Upload product images
  - Set inventory quantities
- **UI Elements**: Form inputs, image upload area, submit button

### Product Detail (src/pages/ProductDetail.tsx)
- **Purpose**: Detailed view of a specific product
- **Features**: 
  - View complete product information
  - See sales history
  - Analytics for the specific product
  - Actions like edit, delete, record sale
- **UI Elements**: Product info cards, sales history table, analytics charts

### Record Sale (src/pages/RecordSale.tsx)
- **Purpose**: Interface for recording product sales
- **Features**: 
  - Select products to sell
  - Set quantities and sale prices
  - Add customer information
- **UI Elements**: Product selection, quantity inputs, price inputs, customer fields

### Warehouse (src/pages/Warehouse.tsx)
- **Purpose**: Manage warehouse operations and inventory locations
- **Features**: Inventory tracking, stock transfers, location management
- **UI Elements**: Inventory status cards, transfer forms, location management

### Customers (src/pages/Customers.tsx)
- **Purpose**: Management of customer information
- **Features**: Add, edit, delete customers, view purchase history
- **UI Elements**: Customer list, detail view, action buttons

### Orders (src/pages/Orders.tsx)
- **Purpose**: Track and manage customer orders
- **Features**: View order details, update order status, process orders
- **UI Elements**: Order list, status filters, detail view

### Categories (src/pages/Categories.tsx)
- **Purpose**: Manage product categories
- **Features**: Create, edit, delete categories, assign products to categories
- **UI Elements**: Category list, management forms

### Profile (src/pages/Profile.tsx)
- **Purpose**: User profile management
- **Features**: Update user information, change password, set preferences
- **UI Elements**: Profile form, settings options

## 🧩 Components

### AutoSidebar (src/components/AutoSidebar.tsx)
- **Purpose**: Main navigation sidebar that collapses on smaller screens
- **Features**: Navigation links, collapse functionality, active state indication
- **Icons**: Uses Lucide React icons for visual representation

### TopBar (src/components/TopBar.tsx)
- **Purpose**: Top navigation bar with user profile and actions
- **Features**: User profile dropdown, notifications, quick actions

### Product Components
- **ProductDetailHeader**: Header for product detail page with actions
- **ProductInfo**: Displays detailed product information
- **ProductAnalytics**: Shows analytics data for a specific product
- **SalesHistory**: Displays sales history for a product
- **ProductNotFound**: Error component when product is not found
- **LoadingSpinner**: Loading indicator for async operations

## 🛠️ Services

### Inventory Service (src/services/inventory/inventory.ts)
- **Purpose**: Handles all inventory-related operations
- **Features**: 
  - CRUD operations for inventory items
  - Marking items as sold
  - Fetching inventory by various criteria

### Sales Service (src/services/sales/sales.ts)
- **Purpose**: Manages sales transactions
- **Features**: Record sales, fetch sales history, sales analytics

### Image Upload Service (src/services/imageUpload.ts)
- **Purpose**: Handles product image uploads
- **Features**: Upload images to storage, delete images, generate URLs

## 🔑 Authentication

The application uses Supabase for authentication. Users can sign up with email and password, and the system stores additional information like company name.

### AuthContext (src/contexts/AuthContext.tsx)
- **Purpose**: Provides authentication state throughout the application
- **Features**: User login state, loading state, user profile

## 📥 Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add required scripts to package.json:
   ```json
   "dev": "vite",
   "build:dev": "vite build --mode development"
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## ⚙️ Configuration

### Supabase Configuration
The application uses Supabase for backend services. Configuration is stored in environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 📚 Usage

1. Sign up for an account or log in
2. Navigate through the sidebar to access different features
3. Add products to your inventory
4. Record sales as they happen
5. View analytics on the dashboard to track business performance

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
