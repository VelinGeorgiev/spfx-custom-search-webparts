import * as React from 'react';

import { SearchContext } from '../hooks/SearchContext';
import { SearchReducer } from '../hooks/SearchReducer';

import { SearchBoxComponent } from './searchBoxComponents/SearchBoxComponent';
import { DefaultSearchResultsComponent } from './searchResultComponents/DefaultSearchResultsComponent';

import { Toggle } from '@fluentui/react/lib/Toggle';
import AcSearchAdvancedOptions from './AcSearcAdvancedOptons';

const AcSearch = () => {
  const [openAdvanced, setOpenAdvanced] = React.useState(false)
  const [searchReducer, dispatchSearchReducer] = React.useReducer(SearchReducer, {});

  return (
    <div>
      <SearchContext.Provider value={{ searchReducer, dispatchSearchReducer }}>

        <SearchBoxComponent />

        <Toggle
          label="Advanced Options"
          inlineLabel
          checked={openAdvanced}
          onChange={e => setOpenAdvanced(!openAdvanced)}
        />
        {openAdvanced && <AcSearchAdvancedOptions />}

        <DefaultSearchResultsComponent />

      </SearchContext.Provider>
    </div>
  );
}

export default AcSearch;