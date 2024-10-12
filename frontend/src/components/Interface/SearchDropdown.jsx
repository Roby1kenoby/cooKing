import React, { useState, useEffect, useContext } from 'react';
import { Dropdown, DropdownButton, FormControl, Spinner } from 'react-bootstrap';
import _ from 'lodash'; 
import { getAllIngredients } from '../../apis/ingredientCRUDS';
import { getAllTags } from '../../apis/tagCRUDS'
import { LoginContext } from '../../contexts/LoginContextProvider';
import {v4 as uuidv4} from 'uuid';

function SearchDropdown({optionsArray, setOptionsArray, type}) {
    const [searchTerm, setSearchTerm] = useState('');      // Search string
    const [options, setOptions] = useState([]);            // array for options returned by API call
    const [loading, setLoading] = useState(false);         
    const {token} = useContext(LoginContext)

    const fetchOptions = async (query) => {
        try {
            setLoading(true);
            let response = {}
            if (type === 'ingredients'){
                response = await getAllIngredients(token, query)
            }
            else {
                response = await getAllTags(token, query)
            }
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
        // if tag, i have to check for duplicates here.
        if(type === 'tags'){
            const alreadySelected = optionsArray.some(o => o._id === option._id)
            if(!alreadySelected){
                setOptionsArray([... optionsArray, {...option, tempId: uuidv4()}])
            }
        }
        else{
            setOptionsArray([... optionsArray, {...option, tempId: uuidv4()}])
        }


        // setOptionsArray([...optionsArray, {...option, tempId: uuidv4()}])
        setSearchTerm('');  // Reset search bar
        setOptions([]);     // Reset options list
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={`Cerca ${type==='ingredients' ? 'ingredienti' : 'tag'}`}
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
                        options?.map(opt => (
                            <Dropdown.Item
                                key={opt._id}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt.name}
                            </Dropdown.Item>
                        ))
                    )}
                </>
            )}
        </DropdownButton>
    );
}

export default SearchDropdown;