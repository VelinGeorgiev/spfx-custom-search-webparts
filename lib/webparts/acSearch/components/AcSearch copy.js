import * as React from 'react';
import { SearchContext } from '../hooks/SearchContext';
import { SearchReducer } from '../hooks/SearchReducer';
import { SearchBoxComponent } from './searchBoxComponents/SearchBoxComponent';
import { DefaultSearchResultsComponent } from './searchResultComponents/DefaultSearchResultsComponent';
import { Toggle } from '@fluentui/react/lib/Toggle';
var AcSearch = function () {
    var _a = React.useState(false), openAdvanced = _a[0], setOpenAdvanced = _a[1];
    var _b = React.useReducer(SearchReducer, {}), searchReducer = _b[0], dispatchSearchReducer = _b[1];
    console.log('---------searchReducer');
    console.log(searchReducer);
    console.log(dispatchSearchReducer);
    return (React.createElement("div", null,
        React.createElement(SearchContext.Provider, { value: { searchReducer: searchReducer, dispatchSearchReducer: dispatchSearchReducer } },
            React.createElement(SearchBoxComponent, null),
            React.createElement(Toggle, { label: "Advanced Options", inlineLabel: true, checked: openAdvanced, onChange: function (e) { return setOpenAdvanced(!openAdvanced); } }),
            React.createElement(DefaultSearchResultsComponent, null))));
};
export default AcSearch;
//# sourceMappingURL=AcSearch%20copy.js.map