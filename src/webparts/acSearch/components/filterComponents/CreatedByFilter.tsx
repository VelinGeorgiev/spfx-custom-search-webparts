import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';
import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';

export interface ICreatedByFilter {
  context: any
}


const CreatedByFilter = ({ context }: ICreatedByFilter) => {
  const { dispatchSearchReducer } = React.useContext(SearchContext);

  const updateKqlQuery = (users: any[]) => {

        let kqlText = '';
        for(let i = 0; i < users.length; i++) {

            kqlText += `author:"${users[i].text}" OR author:"${users[i].secondaryText}"`;
        }

        dispatchSearchReducer({ type: 'createdByFilter', payload: { kqlText, jsonValues: users }})
  }

  return (
    <PeoplePicker titleText="Created By" context={context} onChange={updateKqlQuery} />
  );
}

export default CreatedByFilter;