import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';
import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';

export interface ICreatedByFilter {
  context: any
}


const CreatedByFilter = ({ context }: ICreatedByFilter) => {
  const [defaultUsers, setDefaultUsers] = React.useState([]);
  const { searchReducer, dispatchSearchReducer } = React.useContext(SearchContext);

  React.useEffect(() => {

    if (searchReducer.lastActionType == 'load' &&
      searchReducer.filters &&
      searchReducer.filters.createdByFilter &&
      searchReducer.filters.createdByFilter.jsonValues
    ) {

      const defUsers = searchReducer.filters.createdByFilter.jsonValues.map((x: any) => x.secondaryText);
      setDefaultUsers(defUsers);

    } else {

      setDefaultUsers([]);
    }

  }, [searchReducer])

  const updateKqlQuery = (users: any[]) => {

    let kqlText = '';
    for (let i = 0; i < users.length; i++) {

      kqlText += `author:"${users[i].text}" OR author:"${users[i].secondaryText}"`;
    }

    dispatchSearchReducer({ type: 'createdByFilter', payload: { kqlText, jsonValues: users } })
  }

  return (
    <PeoplePicker
      titleText="Created By"
      context={context}
      defaultSelectedUsers={defaultUsers}
      onChange={updateKqlQuery}
    />
  );
}

export default CreatedByFilter;