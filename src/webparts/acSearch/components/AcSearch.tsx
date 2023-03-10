import * as React from 'react';

import { SearchContext } from '../hooks/SearchContext';
import { SearchReducer } from '../hooks/SearchReducer';

import { SearchBoxComponent } from './searchBoxComponents/SearchBoxComponent';
import { DefaultSearchResultsComponent } from './searchResultComponents/DefaultSearchResultsComponent';

import AcSearchAdvancedOptions from './AcSearcAdvancedOptons';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IAcSearchProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  context: BaseComponentContext;
}

const AcSearch = ({ context }: IAcSearchProps) => {
  const [searchReducer, dispatchSearchReducer] = React.useReducer(SearchReducer, { 
    serverRelativeUrl: context.pageContext.web.serverRelativeUrl,
    absoluteUrl: context.pageContext.web.absoluteUrl,
    user: context.pageContext.user
  });

  return (
    <div>
      <SearchContext.Provider value={{ searchReducer, dispatchSearchReducer }}>

        <SearchBoxComponent />

        <AcSearchAdvancedOptions context={context} />

        <DefaultSearchResultsComponent />

      </SearchContext.Provider>
    </div>
  );
}

export default AcSearch;