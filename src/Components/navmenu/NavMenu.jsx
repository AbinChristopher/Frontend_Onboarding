import { Link } from 'react-router-dom';
import './NavMenu.css';

function NavMenu() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    <li><Link to="/store">Store</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavMenu;
