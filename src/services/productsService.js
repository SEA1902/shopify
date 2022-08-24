import * as httpRequest from '~/utils/httpRequest';

export const get = async (_page, _limit, company) => {
    try {
        const res = await httpRequest.get('products', {
            params: {
                _page,
                _limit,
                company,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getByCompany = async (company) => {
    try {
        const res = await httpRequest.get('products', {
            params: {
                company,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getById = async (productId) => {
    try {
        const res = await httpRequest.get('products/' + productId);
        return res;
    } catch (error) {
        console.log(error);
    }
};
