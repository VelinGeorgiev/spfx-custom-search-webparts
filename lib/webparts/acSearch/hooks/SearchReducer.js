var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var SearchReducer = function (state, action) {
    var type = action.type;
    console.log('REDUCER TRIGGERED');
    console.log(type);
    switch (type) {
        case 'load':
            break;
        case 'setKeywords':
            state = __assign(__assign({}, state), { searchQueryParams: __assign(__assign({}, state.searchQueryParams), { keywords: action.payload.value }) });
            break;
        default:
            state = {};
    }
    return state;
};
//# sourceMappingURL=SearchReducer.js.map