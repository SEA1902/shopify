import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import * as userService from '~/services/userService';
import config from '~/config';
import { LoginContext, actions } from '~/store';

const cx = classNames.bind(styles);

function Login() {
    const [state, dispatch] = useContext(LoginContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.get();

            setUsers(result);
        };

        fetchApi();
    }, []);
    const handleLogin = () => {
        const userData = {
            username,
            password,
        };
        const checkUser = users.find((user) => {
            return user.username === username && user.password === password;
        });

        if (checkUser) {
            navigate(config.routes.home);
            localStorage.setItem('token-info', JSON.stringify(userData));
            dispatch(actions.setIsLogin(true));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')} onSubmit={handleLogin}>
                <label className={cx('form-label')}>Login</label>
                <div className={cx('form-group')}>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <div className={cx('btn-group')}>
                    <button type="submit" className={cx('btn-login')}>
                        Login
                    </button>
                    <Link to={config.routes.register} className={cx('btn-register')}>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
