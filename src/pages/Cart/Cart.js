import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import * as cartService from '~/services/cartService';
import ItemCart from '~/components/ItemCart/ItemCart';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await cartService.get();

            setItems(result);

            let subtotal = 0;
            result.forEach((item) => {
                subtotal += Number(item.total);
            });

            setSubtotal(subtotal);
        };
        fetchApi();
    }, []);

    const deleteItem = (id) => {
        setItems((preState) => {
            let tmp = [...preState];
            tmp = tmp.filter((current) => {
                return current.id !== id;
            });
            return tmp;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-list')}>
                {items.map((item, index) => (
                    <ItemCart
                        key={index}
                        item={item}
                        subtotal={subtotal}
                        setSubtotal={setSubtotal}
                        deleteItem={deleteItem}
                    />
                ))}
            </div>

            <div className={cx('subtotal')}>
                <div className={cx('subtotal-label')}>SubTotal</div>
                <span className={cx('subtotal-value')}>${subtotal}</span>
                <div className={cx('checkout-btn')}>
                    <Button to={config.routes.checkout} primary disabled={!items.length}>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
