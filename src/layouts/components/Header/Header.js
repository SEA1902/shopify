import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Search from '../Search/Search';
import { CartIcon } from '~/components/Icons';
import { LoginContext } from '~/store';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useContext(LoginContext);
    const { isLogin } = state;

    const user = JSON.parse(localStorage.getItem('token-info'));

    return (
        <header className={cx('wrapper')}>
            <div className={cx('navbar')}>
                {isLogin ? (
                    <div className={cx('idetity-user')}>{user.username}</div>
                ) : (
                    <div className={cx('navbar-links')}>
                        <Link to={config.routes.register} className={cx('navbar-link')}>
                            Register
                        </Link>
                        <div className={cx('navbar-separator')}></div>
                        <Link to={config.routes.login} className={cx('navbar-link')}>
                            Login
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Shopify" />
                    <i>Shopify</i>
                </Link>

                <Search />

                <Link to={config.routes.cart} className={cx('cart-btn')}>
                    <CartIcon />
                </Link>
            </div>
        </header>
    );
}

export default Header;
