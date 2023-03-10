export const SearchReducer = (state: any, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case 'setKeywords':
            state = {
                ...state,
                keywords: payload.value
            }
            break;
        case 'createdByFilter':
        case 'fileTypeFilter':
            state = {
                ...state,
                filters: {
                    ...state.filters,
                    [type]: payload
                }
            }
            break;
        case 'load':
            const { filters, keywords} = payload.searchReducer;
            state = { 
                ...state,
                filters,
                keywords
            }
            break;
        default:
            state = {};
    }

    // generate the kql query text

    let kqlText = state.keywords || '*';

    Object.entries(state.filters).forEach(([key, value]) => {
        const filter: { kqlText: string, jsonValue: any } = value as any;

        if(filter.kqlText) {
            kqlText += ` AND (${filter.kqlText})`
        } 
    });

    state = { ...state, kqlText, lastActionType: type }

    console.log('UPDATED STATE');
    console.log(state);

    return state;
}

