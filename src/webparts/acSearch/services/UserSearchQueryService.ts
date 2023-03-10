const UserSearchQueryService = () => {
    const listName = 'UserSearchQueries';

    const getSharePointDigest = async (serverRelativeUrl: string) => {
        const url = `${serverRelativeUrl}/_api/contextinfo`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data.d.GetContextWebInformation.FormDigestValue;
        } catch (error) {
            console.error(error);
        }
    }

    const saveSearchQuery = async (name: string, searchReducer: any) => {

        const { kqlText, serverRelativeUrl } = searchReducer;

        const url = `${serverRelativeUrl}/_api/web/getListByTitle('${listName}')/items`;
        const digest = await getSharePointDigest(serverRelativeUrl);

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=none',
                'Content-Type': 'application/json;odata=none',
                'x-requestdigest': digest,
                'if-match': '*'
            },
            body: JSON.stringify({
                Title: name,
                KQLText: kqlText,
                QueryJSON: JSON.stringify({searchReducer}),
                WorkspaceSearchPath: '',
                ServerRelativeUrl: serverRelativeUrl
            })
        };

        try {
            
            const response = await fetch(url, options);
            //const jsonData = await response.json();
         
            return;

        } catch (error) {
            console.error(error);

            return;
        }
    }

    const getUserQueriesList = async (searchReducer: any) => {

        const { serverRelativeUrl, absoluteUrl, user } = searchReducer;

        const url = `${serverRelativeUrl}/_api/search/postquery`;
        const digest = await getSharePointDigest(serverRelativeUrl);

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'x-requestdigest': digest
            },
            body: JSON.stringify({
                "request": {
                    'Querytext': `path:${absoluteUrl}/lists/${listName}* AND (author:"${user.email}" OR author:"${user.displayName}" ) AND contentclass:STS_ListItem`,
                    'RowLimit': 100,
                    'SelectProperties': {
                        'results': [
                            'ListItemId',
                            'Title',
                            'Author'
                        ]
                    }
                }
            })
        };

        try {
            const result = []
            const response = await fetch(url, options);
            const jsonData = await response.json();

            const rawData = jsonData.d.postquery.PrimaryQueryResult.RelevantResults.Table.Rows.results;

            for (let i = 0; i < rawData.length; i++) {
                const item = {} as any;

                for (let j = 0; j < rawData[i].Cells.results.length; j++) {

                    const field = rawData[i].Cells.results[j];

                    item[field.Key] = field.Value;
                }

                result.push(item);
            }

            return result;

        } catch (error) {
            console.error(error);

            return [];
        }
    }

    const getUserQueryById = async (id: string, searchReducer: any) => {

        const { serverRelativeUrl } = searchReducer;

        const url = `${serverRelativeUrl}/_api/web/getListByTitle('${listName}')/items(${id})`;
        const digest = await getSharePointDigest(serverRelativeUrl);

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'x-requestdigest': digest
            },
        };

        try {
            
            const response = await fetch(url, options);
            const jsonData = await response.json();
         
            return jsonData.d;

        } catch (error) {
            console.error(error);

            return;
        }
    }

    return {
        saveSearchQuery,
        getUserQueriesList,
        getUserQueryById
    }
}

export default UserSearchQueryService;