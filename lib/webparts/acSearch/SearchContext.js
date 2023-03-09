import React from 'react'

const SearchContext = React.createContext({ 
    hasCookieAgreement: false,
    content: null,
    user: null,
    snackbarMessage: false,
    loading: false,
    hasCart: false,
    advanced: false
})

export default SearchContext