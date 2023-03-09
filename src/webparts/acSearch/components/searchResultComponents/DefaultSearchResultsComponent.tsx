import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react/lib/DetailsList';
import SearchService from '../../services/SearchService';

export const DefaultSearchResultsComponent = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const { searchReducer } = React.useContext(SearchContext) as any;

  React.useEffect(() => {
    (async () => {
      // query change triggered by the reducer
      // reload the data

      const { searchQueryParams } = searchReducer;
      const searchService = SearchService();

      const result = await searchService.get(searchQueryParams);
      
      setSearchResults(result);
    }
    )();
  }, [searchReducer]);

  return (
    <div>
      <h2>Debug Data:</h2>

      <div style={{ background: '#ccc' }} >
        Reducer Data:
        <pre>{JSON.stringify(searchReducer, null, 2)}</pre>
      </div>


      <h2>Search Results:</h2>

      <DetailsList 
        items={searchResults} 
        columns={
          [
            {
              key: 'column1',
              name: 'Title',
              fieldName: 'Title',
              minWidth: 160,
              maxWidth: 220,
              isResizable: true
            },
            {
              key: 'column3',
              name: 'ContentClass',
              fieldName: 'contentclass',
              minWidth: 160,
              isResizable: true
            },
            {
              key: 'column2',
              name: 'Author',
              fieldName: 'Title',
              minWidth: 160,
              isResizable: true
            },
            {
              key: 'column4',
              name: 'Path',
              fieldName: 'Path',
              minWidth: 160,
              isResizable: true
            }
          ]
        } 
        selectionMode={SelectionMode.none} 
        layoutMode={DetailsListLayoutMode.justified} 
      />
    </div>
  );
}