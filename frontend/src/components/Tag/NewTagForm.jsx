import { useContext, useEffect, useState } from "react";
import SearchDropdown from "../Interface/SearchDropdown";
import { Button, Col, Row } from "react-bootstrap";
import TagBoxEdit from "./TagBoxEdit";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";

function NewTagForm({}) {
    const [selectedTags, setSelectedTags] = useState([])
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const {newRecipe, addTags} = useContext(NewRecipeContext)

    // useEffect(() => {
    //     console.log(newRecipe)
    // }, [newRecipe])

    const saveTags = function(){
        setDisable(!disable)
        setEditMode(!editMode)
        addTags(selectedTags)
        console.log(selectedTags)
    }

    const toggleMode = function () {
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removeTags = function () {
        setSelectedTags([])
        addTags([])
    }

    return ( 
        <>
            <Row>
                <Col>
                    <SearchDropdown 
                        optionsArray={selectedTags} setOptionsArray={setSelectedTags} 
                        type={'tags'} 
                        disabled={disable}
                        />
                </Col>
                <Col>
                    {selectedTags.map(t => 
                        <TagBoxEdit 
                            key={t.tempId} tag={t} 
                            selectedTags={selectedTags} 
                            setSelectedTags={setSelectedTags}
                            disabled={disable}/>
                    )}
                </Col>
            </Row>
            <Row>
                {!disable && <Button variant="primary" onClick={saveTags}>
                    Salva
                </Button>}
                {disable && <Button variant="warning" onClick={toggleMode}>
                    Modifica
                </Button>}
                {disable && <Button variant="danger" onClick={removeTags}>
                    Cancella tutti
                </Button>}
            </Row>
        </>
        
    );
}

export default NewTagForm;