import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    todos: [],
    inputValue: "",
    flag: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.RENDERTODOS:
            return ({
                ...state,
                todos: action.payload
            })
        default:
            return state;
    }

}
