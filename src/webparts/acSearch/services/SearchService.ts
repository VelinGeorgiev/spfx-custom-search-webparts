const SearchService = () => {

    const getSharePointDigest = async () => {
        const url = '/_api/contextinfo';
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

    const get = async (searchQueryParams: any) => {

        const { keywords } = searchQueryParams;

        const url = `/_api/search/postquery`;
        const digest = await getSharePointDigest();

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'x-requestdigest': digest
            },
            body: JSON.stringify({
                "request": {
                    'Querytext': keywords,
                    'RowLimit': 50,
                    'SelectProperties': {
                        'results': [
                            'Title',
                            'Path',
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

    return {
        get
    }
}

export default SearchService;