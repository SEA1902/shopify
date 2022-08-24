import * as httpRequest from '~/utils/httpRequest';

export const get = async () => {
    try {
        const res = await httpRequest.get('addToCart');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const post = async (item) => {
    try {
        await httpRequest.post('addToCart', item);
    } catch (error) {
        console.log(error);
    }
};

export const deleteItem = async (id) => {
    try {
        await httpRequest.deleteItem('addToCart/' + id);
    } catch (error) {
        console.log(error);
    }
};
