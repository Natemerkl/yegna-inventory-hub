
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import RecordSale from './pages/RecordSale';
import Warehouse from './pages/Warehouse';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AutoSidebar from './components/AutoSidebar';
import TopBar from './components/TopBar';

const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AutoSidebar />
      <div className="flex-1 flex flex-col ml-20 lg:ml-64 transition-all duration-300">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Products />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <AddProduct />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <AddProduct />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/view/:id"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <ProductDetail />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/products/record-sale/:id"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <RecordSale />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/warehouse"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Warehouse />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Customers />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Orders />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <AuthenticatedRoute>
                <Layout>
                  <Categories />
                </Layout>
              </AuthenticatedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
