import * as React from 'react';
import { Stack } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { SearchBox } from '@fluentui/react/lib/SearchBox';

import { SearchContext } from '../../hooks/SearchContext';

export const SearchBoxComponent = () => {
    const [keywords, setKeywords] = React.useState(null);
    const { dispatchSearchReducer } = React.useContext(SearchContext) as any; //searchReducer

    // React.useEffect(() => {
    
    // }, [searchReducer])

    const updateKeywords = () => {
        dispatchSearchReducer({type: 'setKeywords', payload: { value: keywords }})
    }

    return (
        <Stack horizontal>

            <SearchBox 
                placeholder="Search" 
                onSearch={updateKeywords} 
                onChange={(e, value) => setKeywords(value) } 
                value={keywords || ''}
            />

            <PrimaryButton text="Search" onClick={updateKeywords} />
        </Stack>
    );
}