import React, { useState, useEffect, useContext } from 'react';
import { FormControl, ListGroup, Spinner } from 'react-bootstrap';
import _ from 'lodash';
import { getAllIngredients } from '../../apis/ingredientCRUDS';
import { getAllTags } from '../../apis/tagCRUDS'
import { LoginContext } from '../../contexts/LoginContextProvider';
import { v4 as uuidv4 } from 'uuid';

function SearchBar({ optionsArray, setOptionsArray, type }) {
    const [searchTerm, setSearchTerm] = useState('');      // Search string
    const [options, setOptions] = useState([]);            // array for options returned by API call
    const [loading, setLoading] = useState(false);
    const { token } = useContext(LoginContext)

    const fetchOptions = async (query) => {
        try {
            setLoading(true);
            let response = {}
            
            switch (type) {
                case "tagsIn":
                case "tagsSearch": response = await getAllTags(token, query)
                break;
                case "ingredientsIn": 
                case "ingredientsSearch": response = await getAllIngredients(token, query)
                break;
                default: return ''
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
        if (type === 'tags') {
            const alreadySelected = optionsArray.some(o => o._id === option._id)
            if (!alreadySelected) {
                setOptionsArray([...optionsArray, { ...option, tempId: uuidv4() }])
            }
        }
        else {
            setOptionsArray([...optionsArray, { ...option, tempId: uuidv4() }])
        }


        // setOptionsArray([...optionsArray, {...option, tempId: uuidv4()}])
        setSearchTerm('');  // Reset search bar
        setOptions([]);     // Reset options list
    };

    const searchPlaceHolder = () => {
        switch (type) {
            case "tagsIn": return 'Inserisci un tag!'
            case "tagsSearch": return 'Ricerca per tag!'
            case "ingredientsIn": return 'Inserisci un ingrediente!'
            case "ingredientsSearch": return 'Ricerca un ingrediente!'
            default: return ''
        }
    }

    return (
        <>
            <FormControl
                placeholder={searchPlaceHolder()}
                value={searchTerm}
                onChange={handleSearchChange}
                className='text-form-field'
            />
            <ListGroup>
                {loading ? (
                    <ListGroup.Item as="div" className="text-center">
                        <Spinner animation="border" size="sm" />
                    </ListGroup.Item>
                ) : (
                    <>
                        {options?.length === 0 && searchTerm.length >= 2 ? (
                            <ListGroup.Item as="div" disabled>
                                No options found
                            </ListGroup.Item>
                        ) : (
                            options?.map(opt => (
                                <ListGroup.Item
                                    key={opt._id}
                                    onClick={() => handleSelect(opt)}
                                >
                                    {opt.name}
                                </ListGroup.Item>
                            ))
                        )}
                    </>
                )}
            </ListGroup>
        </>
    );
}

export default SearchBar;