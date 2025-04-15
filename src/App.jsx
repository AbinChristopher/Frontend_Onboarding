import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './redux/store';
import CustomerPage from './pages/CustomerPage';
import StorePage from './pages/StorePage';
import SalesPage from './pages/SalesPage';
import ProductsPage from './pages/ProductsPage'; // ✅ Added ProductsPage import
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    {/* Navigation Bar */}
                    <nav className="navbar">
                        <ul>
                            <li><Link to="/customers">Customers</Link></li>
                            <li><Link to="/store">Store</Link></li>
                            <li><Link to="/sales">Sales</Link></li>
                            <li><Link to="/products">Products</Link></li> {/* ✅ Added Products link */}
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div className="main-content">
                        <Routes>
                            <Route path="/customers" element={<CustomerPage />} />
                            <Route path="/store" element={<StorePage />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/products" element={<ProductsPage />} /> {/* ✅ Added Products route */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
