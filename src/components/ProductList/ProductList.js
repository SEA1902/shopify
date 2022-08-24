import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
import * as productsService from '~/services/productsService';
import Product from '~/components/Product';

const cx = classNames.bind(styles);

function ProductList({ company }) {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.get(page, limit, company);

            setProducts(result);

            const allproduct = await productsService.getByCompany(company);
            const length = allproduct.length;
            var arr = [];

            if (length % limit === 0) {
                for (let i = 1; i <= length / limit; i++) {
                    arr.push(
                        <button key={i} className={page === i ? cx('page-active') : ''} onClick={() => handlePage(i)}>
                            {i}
                        </button>,
                    );
                }

                setPages(arr);
            } else {
                let number = Math.floor(length / limit) + 1;
                for (let i = 1; i <= number; i++) {
                    arr.push(
                        <button key={i} className={page === i ? cx('page-active') : ''} onClick={() => handlePage(i)}>
                            {i}
                        </button>,
                    );
                }

                setPages(arr);
            }
        };

        fetchApi();
    }, [page, limit, company]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.getByCompany(company);
            const length = result.length;
            var arr = [];

            if (length % limit === 0) {
                for (let i = 1; i <= length / limit; i++) {
                    arr.push(
                        <button key={i} className={page === i ? cx('page-active') : ''} onClick={() => handlePage(i)}>
                            {i}
                        </button>,
                    );
                }

                setPages(arr);
            } else {
                let number = Math.floor(length / limit) + 1;
                for (let i = 1; i <= number; i++) {
                    arr.push(
                        <button key={i} className={page === i ? cx('page-active') : ''} onClick={() => handlePage(i)}>
                            {i}
                        </button>,
                    );
                }

                setPages(arr);
            }
        };

        fetchApi();
        setPage(1);
    }, [limit, company]);

    const handleLimit = (limit) => {
        setLimit(limit);
    };

    const handlePage = (i) => {
        setPage(i);
    };
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < pages.length) setPage(page + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('limit')}>
                Show
                <select className={cx('select-limit')} onChange={(e) => handleLimit(e.target.value)} value={limit}>
                    <option>8</option>
                    <option>16</option>
                    <option>32</option>
                </select>
                per page
            </div>

            <div className={cx('product-list')}>
                {products.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </div>

            <div className={cx('pagination')}>
                <button onClick={handlePreviousPage}>&laquo;</button>
                {pages}
                <button onClick={handleNextPage}>&raquo;</button>
            </div>
        </div>
    );
}

export default ProductList;
