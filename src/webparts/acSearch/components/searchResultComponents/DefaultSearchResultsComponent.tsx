import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react/lib/DetailsList';
import SearchService from '../../services/SearchService';

export const DefaultSearchResultsComponent = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const { searchReducer } = React.useContext(SearchContext);

  React.useEffect(() => {
    (async () => {
      // query change triggered by the reducer
      // reload the data
      const searchService = SearchService();

      const result = await searchService.get(searchReducer);

      setSearchResults(result);
    }
    )();
  }, [searchReducer]);

  return (
    <div>
      <h2>Debug Data:</h2>

      {searchReducer &&
        <code>
          <pre>
            {JSON.stringify(searchReducer, null, 2)}

          </pre>
        </code>}
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        KQL Query: <br />{searchReducer.kqlText}
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
              maxWidth: 160,
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
              key: 'column4',
              name: 'FileExtension',
              fieldName: 'FileExtension',
              minWidth: 160,
              isResizable: true

            },
            {
              key: 'column5',
              name: 'Author',
              fieldName: 'Author',
              minWidth: 160,
              isResizable: true
            },
            {
              key: 'column6',
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