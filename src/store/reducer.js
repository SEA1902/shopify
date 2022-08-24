import { SET_IS_LOGIN } from './constant';

const initState = {
    isLogin: false,
    user: [],
};

function reducer(state, action) {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            };

        default:
            throw new Error('Invalid action.');
    }
}

export { initState };
export default reducer;
