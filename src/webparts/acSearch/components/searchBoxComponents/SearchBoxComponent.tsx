import * as React from 'react';
import { Stack } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { SearchBox } from '@fluentui/react/lib/SearchBox';

import { SearchContext } from '../../hooks/SearchContext';

export const SearchBoxComponent = () => {
    const { searchReducer, dispatchSearchReducer } = React.useContext(SearchContext);
    const [keywords, setKeywords] = React.useState(null);

    React.useEffect(() => {

        if (searchReducer.lastActionType == 'load' && searchReducer.keywords !== '*') {
            setKeywords(searchReducer.keywords);
        }
    }, [searchReducer])

    const updateKeywords = () => {
        dispatchSearchReducer({ type: 'setKeywords', payload: { value: keywords } })
    }

    return (
        <Stack horizontal>
            <SearchBox
                placeholder="Search"
                onSearch={updateKeywords}
                onChange={(e, value) => setKeywords(value)}
                value={keywords || ''}
                defaultValue={keywords}
            />
            <PrimaryButton text="Search" onClick={updateKeywords} />
        </Stack>
    );
}