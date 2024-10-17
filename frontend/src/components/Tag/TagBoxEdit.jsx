import { useContext, useEffect } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Badge } from "react-bootstrap";


function TagBoxEdit({tag, setSelectedTags}) {
    const { deleteTag } = useContext(NewRecipeContext)
    
    const removeTag = function(){
        setSelectedTags(prevSelTags => [...prevSelTags.filter(t => t._id !== tag._id)])
        deleteTag(tag)
    }

    return ( 
        <Badge bg="success" className="singleBadge"
            onClick={removeTag}>
            {tag.name}
        </Badge>
    );
}

export default TagBoxEdit;