export const SearchReducer = (state: any, action: any) => {
    const type = action.type;

    console.log('REDUCER TRIGGERED');
    console.log(type);

    switch (type) {
        case 'load':
            break;
        case 'setKeywords':
            state = {
                ...state,
                searchQueryParams: {
                    ...state.searchQueryParams,
                    keywords: action.payload.value
                }
            }
            break;
        default:
            state = {};
    }

    return state;
}

