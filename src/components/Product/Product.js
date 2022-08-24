import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '../Button';
import * as cartService from '~/services/cartService';
import config from '~/config';

const cx = classNames.bind(styles);

function Product({ product }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await cartService.get();

            setItems(result);
        };
        fetchApi();
    }, []);

    const handleAddToCart = (product) => {
        const checkItem = items.find((item) => {
            return item.product.id === product.id;
        });
        if (!checkItem) {
            const item = {
                product: product,
                quantity: 1,
                total: product.price,
            };
            const fetchApi = async () => {
                await cartService.post(item);
            };
            fetchApi();
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Link
                to={{
                    pathname: config.routes.productpage,
                    search: `${product.id}`,
                }}
            >
                <img
                    className={cx('product-image')}
                    src={product.image}
                    alt="products"
                ></img>
                <div className={cx('product-name')}>{product.name}</div>
            </Link>

            <div className={cx('product-price')}>
                <label>As low as </label>
                <span>${product.price}</span>
            </div>
            <div className={cx('product-btn')}>
                <Button primary onClick={() => handleAddToCart(product)}>
                    Add To Cart
                </Button>
            </div>
        </div>
    );
}

export default Product;
