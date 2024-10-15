import { useContext, useEffect, useState } from 'react';
import './AddTag.css'
import { NewRecipeContext } from '../../contexts/NewRecipeContextProvider';
import SearchDropdown from '../Interface/SearchDropdown';
import TagBoxEdit from './TagBoxEdit';

function AddTag() {
    const [selectedTags, setSelectedTags] = useState([])
    const {newRecipe, setNewRecipe} = useContext(NewRecipeContext)

    // useEffect(()=>{
    //     console.log(newRecipe)
    // },[newRecipe])

    // when a new tag is selected\removed, i directly update the recipe in the context
    const updateRecipe = function(){
        setNewRecipe(prevRecipe => ({...prevRecipe, tagsIds: selectedTags}))
    }

    useEffect(updateRecipe, [selectedTags])

    return ( 
        <>
            <SearchDropdown optionsArray={selectedTags} setOptionsArray={setSelectedTags} type='tags'></SearchDropdown>
            {newRecipe.tagsIds?.map((tag) => 
                <TagBoxEdit
                    key={tag._id}
                    tag={tag}
                />
            )}
        </>
    );
}

export default AddTag;