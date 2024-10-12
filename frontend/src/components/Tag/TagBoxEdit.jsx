import { useContext, useEffect } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Badge } from "react-bootstrap";



function TagBoxEdit({tag, selectedTags, setSelectedTags}) {
    const { addTag, deleteTag } = useContext(NewRecipeContext)

    useEffect(() => {
        addTag(tag)
    }, [])

    const removeTag = function(){
        deleteTag(tag)
        setSelectedTags(prevSelTag => ([...prevSelTag.filter(t => t._id != tag._id)]))
    }

    return ( 
        <Badge bg="success"
            onClick={removeTag}>
            {tag.name}
        </Badge>
    );
}

export default TagBoxEdit;