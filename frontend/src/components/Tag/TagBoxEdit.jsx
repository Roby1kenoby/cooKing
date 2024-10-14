import { useContext, useEffect } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Badge } from "react-bootstrap";



function TagBoxEdit({tag}) {
    const { deleteTag } = useContext(NewRecipeContext)

    const removeTag = function(){
        deleteTag(tag)
    }

    return ( 
        <Badge bg="success"
            onClick={removeTag}>
            {tag.name}
        </Badge>
    );
}

export default TagBoxEdit;