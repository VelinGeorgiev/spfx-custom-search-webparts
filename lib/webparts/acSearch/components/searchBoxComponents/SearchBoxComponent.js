import * as React from 'react';
import { Stack } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { SearchContext } from '../../hooks/SearchContext';
export var SearchBoxComponent = function () {
    var _a = React.useState(null), keywords = _a[0], setKeywords = _a[1];
    var dispatchSearchReducer = React.useContext(SearchContext).dispatchSearchReducer; //searchReducer
    // React.useEffect(() => {
    // }, [searchReducer])
    var updateKeywords = function () {
        dispatchSearchReducer({ type: 'setKeywords', payload: { value: keywords } });
    };
    return (React.createElement(Stack, { horizontal: true },
        React.createElement(SearchBox, { placeholder: "Search", onSearch: updateKeywords, onChange: function (e, value) { return setKeywords(value); }, value: keywords || '' }),
        React.createElement(PrimaryButton, { text: "Search", onClick: updateKeywords })));
};
//# sourceMappingURL=SearchBoxComponent.js.map