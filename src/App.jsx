import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import NavMenu from './components/navmenu/NavMenu'; 
import CustomerPage from './pages/CustomerPage';
import StorePage from './pages/StorePage';
import SalesPage from './pages/SalesPage';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage'; 
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    <NavMenu /> 

                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} /> 
                            <Route path="/customers" element={<CustomerPage />} />
                            <Route path="/store" element={<StorePage />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
