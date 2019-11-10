import React from 'react'
import Search from './Search'
import { makeStyles } from '@material-ui/core/styles'
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'

const SearchPage = () => {
      
    const [{ searchResult }, dispatch] = useStateValue();

    return (
        <Search/>
    )
}
export default SearchPage;