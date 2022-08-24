import * as httpRequest from '~/utils/httpRequest';

export const get = async () => {
    try {
        const res = await httpRequest.get('users');
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const post = async (username, password) => {
    try {
        await httpRequest.post('users', {
            username: username,
            password: password,
        });
    } catch (error) {
        console.log(error);
    }
};
