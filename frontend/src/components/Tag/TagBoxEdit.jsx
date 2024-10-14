import { useContext, useEffect } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Badge } from "react-bootstrap";



function TagBoxEdit({tag, setSelectedTags, disabled}) {
    
    const removeTag = function(){
        if(!disabled){
            setSelectedTags(prevSelTags => {
                const newSelTags = prevSelTags.filter(t => t.tempId !== tag.tempId)
                return newSelTags
            })
        }
    }

    return ( 
        <Badge bg="success"
            onClick={removeTag}>
            {tag.name}
        </Badge>
    );
}

export default TagBoxEdit;