import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Cart from '~/pages/Cart';
import ProductPage from '~/pages/ProductPage';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Checkout from '~/pages/Checkout';

// Public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.following, component: Following },
    { path: config.routes.productpage, component: ProductPage, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: HeaderOnly },
    { path: config.routes.checkout, component: Checkout, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
