
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
- [AI Features](#ai-features)
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
- **AI-Powered Insights**: Leverage artificial intelligence for business analysis
- **Multiple Apps**: Integrated chat, calendar, todo, and email applications

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

### Category (src/pages/Categories.tsx)
- **Purpose**: Organize products into logical categories
- **Features**: Create, edit, and delete categories
- **UI Elements**: Category list, management forms, hierarchy visualization

### Attributes (src/pages/Attributes.tsx)
- **Purpose**: Manage product attributes like size, color, material
- **Features**: 
  - List all attributes with filtering capabilities
  - Create, edit, and delete attributes
  - Assign attributes to products
- **UI Elements**: Table with attribute details, edit forms, attribute value management

### Import Products (src/pages/ImportProducts.tsx)
- **Purpose**: Bulk import products from CSV/Excel files
- **Features**: File upload, template download, format validation
- **UI Elements**: Upload area, import history, status indicators

### Inventory List (src/pages/Inventory.tsx)
- **Purpose**: Comprehensive view of all inventory items
- **Features**: Stock levels, low stock alerts, inventory valuation
- **UI Elements**: Filterable table, stock status indicators, inventory metrics

### Customer List (src/pages/Customers.tsx)
- **Purpose**: Management of all customer information
- **Features**: View, add, edit, delete customers, customer history
- **UI Elements**: Customer grid/list view, search, filter options

### Sellers (src/pages/Sellers.tsx)
- **Purpose**: Manage third-party sellers or internal sales staff
- **Features**: List, create, edit seller profiles, track sales performance
- **UI Elements**: Seller profiles, performance metrics, commission tracking

### Coupons (src/pages/Coupons.tsx)
- **Purpose**: Create and manage discount coupons
- **Features**: Set discount amounts, expiry dates, usage limits
- **UI Elements**: Active coupon list, creation form, usage statistics

### Roles (src/pages/Roles.tsx)
- **Purpose**: Define user roles and permissions
- **Features**: Create and modify roles, assign permissions
- **UI Elements**: Role matrix, permission checkboxes, role assignment

### Profile (src/pages/Profile.tsx)
- **Purpose**: User profile management
- **Features**: Update user information, change password, set preferences
- **UI Elements**: Profile form, settings options

### Permission (src/pages/Permission.tsx)
- **Purpose**: Granular permission management
- **Features**: Create, assign, and revoke permissions for users
- **UI Elements**: Permission matrix, user assignment, role integration

### Invoice (src/pages/Invoice.tsx)
- **Purpose**: Generate and manage sales invoices
- **Features**: Create, view, download, and send invoices
- **UI Elements**: Invoice templates, customer selection, payment tracking

### Review (src/pages/Review.tsx)
- **Purpose**: Manage product reviews and ratings
- **Features**: View, moderate, respond to customer reviews
- **UI Elements**: Review list, rating analytics, moderation tools

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

### Orders (src/pages/Orders.tsx)
- **Purpose**: Track and manage customer orders
- **Features**: View order details, update order status, process orders
- **UI Elements**: Order list, status filters, detail view

### General Settings (src/pages/Settings.tsx)
- **Purpose**: Configure system-wide settings
- **Features**: Currency, tax rates, email templates, notification preferences
- **UI Elements**: Settings form, configuration options, save/reset buttons

### Help Center (src/pages/HelpCenter.tsx)
- **Purpose**: Provide system documentation and support
- **Features**: Searchable documentation, video tutorials, support ticket creation
- **UI Elements**: Documentation browser, search function, contact form

### FAQs (src/pages/FAQs.tsx)
- **Purpose**: Answer common user questions
- **Features**: Categorized FAQs, searchable database
- **UI Elements**: FAQ categories, expandable answers, search function

### Privacy Policy (src/pages/PrivacyPolicy.tsx)
- **Purpose**: Display legal privacy information
- **Features**: Privacy terms, data usage policies, compliance information
- **UI Elements**: Legal text with sections, last updated timestamp

### Chat App (src/pages/ChatApp.tsx)
- **Purpose**: Internal communication tool
- **Features**: Real-time messaging, file sharing, user presence
- **UI Elements**: Chat window, contact list, message input

### Calendar App (src/pages/CalendarApp.tsx)
- **Purpose**: Schedule management
- **Features**: Event creation, reminders, meeting scheduling
- **UI Elements**: Monthly/weekly/daily views, event cards, creation modal

### Todo App (src/pages/TodoApp.tsx)
- **Purpose**: Task management
- **Features**: Create, assign, and track tasks with deadlines
- **UI Elements**: Task lists, priority indicators, filter options

### Email App (src/pages/EmailApp.tsx)
- **Purpose**: Email communication within the platform
- **Features**: Compose, read, reply to emails, template usage
- **UI Elements**: Inbox view, composition form, folder organization

## 🧠 AI Features

### Predictive Analytics
- **Sales Forecasting**: AI algorithms analyze historical sales data to predict future sales trends
- **Inventory Optimization**: Suggests optimal inventory levels based on sales velocity and seasonality
- **Demand Prediction**: Anticipates customer demand for specific products
- **Anomaly Detection**: Identifies unusual sales or inventory patterns that might indicate issues

### Smart Recommendations
- **Product Bundles**: Suggests complementary products that sell well together
- **Pricing Optimization**: Recommends optimal price points based on market data
- **Restocking Alerts**: Intelligent notifications when inventory needs replenishing
- **Customer Insights**: Analyzes customer purchasing patterns for targeted marketing

### Automated Reporting
- **Natural Language Summaries**: Converts complex data into easy-to-understand reports
- **Trend Analysis**: Identifies and explains emerging business trends
- **Performance Metrics**: Automatically tracks KPIs and highlights areas for improvement
- **Customizable Dashboards**: AI-driven dashboards that adapt to user preferences

### Conversational Assistant
- **Voice-Enabled Commands**: Perform system actions through voice recognition
- **Natural Language Queries**: Ask questions about inventory or sales in plain language
- **Contextual Help**: Provides assistance based on the user's current task
- **Multi-language Support**: Communicates in multiple languages for global teams

### Image Recognition
- **Product Identification**: Scan products to quickly find them in the inventory
- **Damage Assessment**: Detect and document product damage during receiving
- **Barcode and QR Scanning**: Quickly process inventory with camera-based scanning
- **Document Processing**: Extract data from invoices and forms automatically

### Operational Intelligence
- **Process Optimization**: Identifies bottlenecks in warehouse operations
- **Staff Scheduling**: Recommends optimal staffing based on projected workload
- **Risk Prediction**: Flags potential supply chain disruptions before they occur
- **Cost Reduction Strategies**: Suggests ways to reduce operational costs

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
