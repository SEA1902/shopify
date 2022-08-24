import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ItemCart.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

import * as cartService from '~/services/cartService';

const cx = classNames.bind(styles);

function ItemCart({ item, subtotal, setSubtotal, deleteItem }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantity = (quantity) => {
        item.total = item.product.price * quantity;
        subtotal = subtotal + item.total - item.product.price * item.quantity;
        item.quantity = quantity;
        setQuantity(quantity);
        setSubtotal(subtotal);
    };

    const handleDelete = () => {
        const fetchApi = async () => {
            await cartService.deleteItem(item.id);
        };
        fetchApi();

        subtotal -= item.total;
        setSubtotal(subtotal);
        deleteItem(item.id);
    };
    return (
        <div className={cx('wrapper')}>
            <Link
                to={{
                    pathname: config.routes.productpage,
                    search: `${item.product.id}`,
                }}
                className={cx('product-media')}
            >
                <img className={cx('product-image')} src={item.product.image} alt="products"></img>
                <div className={cx('product-name')}>{item.product.name}</div>
            </Link>
            <div className={cx('product-price')}>${item.product.price}</div>
            <div className={cx('product-quantity')}>
                <input type="number" value={quantity} onChange={(e) => handleQuantity(e.target.value)} min="1" />
            </div>

            <div className={cx('product-total')}>${item.total}</div>

            <div className={cx('delete-btn')}>
                <span onClick={handleDelete}>Xóa</span>
            </div>
        </div>
    );
}

export default ItemCart;
