import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [ searchValue, setSearchValue ] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log(searchValue);
        if(searchValue){
            navigate(`/posts/${searchValue}`);
            setSearchValue('');
        }
    }

    return (
        <div id='search'>
            <div className='search__inner'>
                <label htmlFor='searchInput'>
                    <span className='ir'>검색</span>
                </label>
                <input 
                    type='search' 
                    name='searchInput' 
                    id='searchInput' 
                    autoComplete='off'
                    className='search__input'
                    placeholder='검색어를 입력해주세요!'
                    onChange={e => setSearchValue(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter'){
                            handleSearch();
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Search