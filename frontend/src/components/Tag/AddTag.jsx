import { useContext, useEffect, useState } from 'react';
import './AddTag.css'
import { NewRecipeContext } from '../../contexts/NewRecipeContextProvider';
import SearchBar from '../Interface/SearchBar';
import TagBoxEdit from './TagBoxEdit';

function AddTag() {
    const [selectedTags, setSelectedTags] = useState([])
    const {newRecipe, setNewRecipe, dataReady} = useContext(NewRecipeContext)

    // useEffect(()=>{
    //     console.log(newRecipe)
    // },[newRecipe])

    // when a new tag is selected\removed, i directly update the recipe in the context
    const updateRecipe = function(){
        setNewRecipe(prevRecipe => ({...prevRecipe, tagsIds: selectedTags}))
    }

    // need this function to update the selectedTags state with the one in the recipe being edited
    const getTagsFromRecipe = function(){
        if(dataReady && newRecipe){
            setSelectedTags(newRecipe.tagsIds)
        }
        else{
            setSelectedTags([])
        }
    }

    useEffect(() => {
        getTagsFromRecipe()
    }, [dataReady])

    useEffect(updateRecipe, [selectedTags])

    // useEffect(()=>{
    //     console.log(selectedTags)
    // })

    return ( 
        <div>
            
            <SearchBar optionsArray={selectedTags} setOptionsArray={setSelectedTags} type='tagsIn'></SearchBar>
            <div className='d-flex p-0'>
                {selectedTags?.length > 0 && <p className='d-inline align-self-center m-0'>Tag selezionati:</p>}
                <div className='badgeContainer pb-0 pt-0'>
                    {newRecipe.tagsIds?.map((tag) => 
                        <TagBoxEdit
                            key={tag._id}
                            tag={tag}
                            setSelectedTags={setSelectedTags}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddTag;