import { useContext, useEffect, useState } from 'react';
import './AddTag.css'
import { NewRecipeContext } from '../../contexts/NewRecipeContextProvider';
import SearchDropdown from '../Interface/SearchDropdown';
import TagBoxEdit from './TagBoxEdit';

function AddTag() {
    const [selectedTags, setSelectedTags] = useState([])
    const {newRecipe} = useContext(NewRecipeContext)

    useEffect(()=>{
        console.log(newRecipe)
    },[newRecipe])

    return ( 
        <>
            <SearchDropdown optionsArray={selectedTags} setOptionsArray={setSelectedTags} type='tags'></SearchDropdown>
            {selectedTags.map((tag) => 
                <TagBoxEdit
                    key={tag._id}
                    tag={tag}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            )}
        </>
    );
}

export default AddTag;