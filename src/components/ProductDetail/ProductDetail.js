import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Button from '../Button';
import * as cartService from '~/services/cartService';
import * as productsService from '~/services/productsService';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    let location = useLocation();
    var productId = location.search.slice(1);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.getById(productId);

            setProduct(result);
        };

        fetchApi();
    }, [productId]);

    const handleAddToCart = () => {
        let total = product.price * quantity;
        const item = {
            product: product,
            quantity: quantity,
            total: total,
        };
        const fetchApi = async () => {
            await cartService.post(item);
        };
        fetchApi();
    };

    const handleQuantity = (quantity) => {
        setQuantity(quantity);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-info')}>
                <div className={cx('product-media')}>
                    <img className={cx('product-image')} src={product.image} alt="products"></img>
                </div>
                <div className={cx('product-info-main')}>
                    <div className={cx('product-name')}>{product.name}</div>
                    <div className={cx('product-price')}>
                        <label>As low as </label>
                        <span>${product.price}</span>
                    </div>

                    <div className={cx('product-quantity')}>
                        <label>Số lượng:</label>
                        <input type="number" onChange={(e) => handleQuantity(e.target.value)} value={quantity} />
                    </div>

                    <div className={cx('product-btn')}>
                        <Button primary large onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className={cx('product-info-detail')}></div>
        </div>
    );
}

export default ProductDetail;
