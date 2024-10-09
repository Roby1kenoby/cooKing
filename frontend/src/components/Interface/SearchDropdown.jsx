import React, { useState, useEffect, useContext } from 'react';
import { Dropdown, DropdownButton, FormControl, Spinner } from 'react-bootstrap';
import _ from 'lodash'; 
import { getAllIngredients } from '../../apis/ingredientCRUDS';
import { LoginContext } from '../../contexts/LoginContextProvider';

function SearchDropdown({optionsArray, setOptionsArray}) {
    const [searchTerm, setSearchTerm] = useState('');      // Search string
    const [options, setOptions] = useState([]);            // array for options returned by API call
    const [loading, setLoading] = useState(false);         
    const {token} = useContext(LoginContext)

    // API call to get things TODO parametric
    const fetchOptions = async (query) => {
        try {
            setLoading(true);
            const response = await getAllIngredients(token, query);
            setOptions(response); 
            setLoading(false);
        } catch (error) {
            console.error('Error fetching options', error);
            setLoading(false);
        }
    };

    // wait 500 ms before calling API
    const debouncedFetch = React.useCallback(_.debounce(fetchOptions, 500), []);

    // calling API only if there are at least 2 char in the search string
    useEffect(() => {
        if (searchTerm.length >= 2) {
            debouncedFetch(searchTerm);
        } else {
            setOptions([]); // Reset delle opzioni se meno di 2 caratteri
        }
    }, [searchTerm, debouncedFetch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // upon selecting an option, it get pushed into the state array
    const handleSelect = (option) => {
        setOptionsArray([...optionsArray, option])
        setSearchTerm('');  // Reset search bar
        setOptions([]);     // Reset options list
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title="Cerca ingredienti"
        >
            <Dropdown.Item as="div">
                <FormControl
                    autoFocus
                    placeholder="Comincia a scrivere!"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Dropdown.Item>

            {loading ? (
                <Dropdown.Item as="div" className="text-center">
                    <Spinner animation="border" size="sm" />
                </Dropdown.Item>
            ) : (
                <>
                    {options?.length === 0 && searchTerm.length >= 2 ? (
                        <Dropdown.Item as="div" disabled>
                            No options found
                        </Dropdown.Item>
                    ) : (
                        options?.map(ing => (
                            <Dropdown.Item
                                key={ing._id}
                                onClick={() => handleSelect(ing)}
                            >
                                {ing.name}
                            </Dropdown.Item>
                        ))
                    )}
                </>
            )}
        </DropdownButton>
    );
}

export default SearchDropdown;