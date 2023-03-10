import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import UserSearchQueryService from '../../services/UserSearchQueryService';

const LoadUserQueryComponent = () => {
    const { searchReducer, dispatchSearchReducer } = React.useContext(SearchContext);
    const [options, setOptions] = React.useState([] as IDropdownOption[]);
    const userSerchService = UserSearchQueryService();

    React.useEffect(() => {
        (async () => {
            const data = await userSerchService.getUserQueriesList(searchReducer);

            const list = [];
            for (let i = 0; i < data.length; i++) {
                list.push({ key: data[i].ListItemId, text: data[i].Title });
            }

            setOptions(list);
        })();
    }, [])


    const loadKQLQuery = async (e: any, selectecValue: IDropdownOption) => {
        const { QueryJSON } = await userSerchService.getUserQueryById(selectecValue.key as string, searchReducer);

        dispatchSearchReducer({ type: 'load', payload: JSON.parse(QueryJSON) });
    }

    return (
        <>
            {options && options.length > 0 &&
                <Dropdown
                    placeholder="Select options"
                    label="Load Saved Search Query"
                    options={options}
                    onChange={loadKQLQuery}
                />}
        </>
    );
}

export default LoadUserQueryComponent;