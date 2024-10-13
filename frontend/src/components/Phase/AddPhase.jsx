import './AddPhase.css'
import { Button, Col, Row } from 'react-bootstrap';
import SinglePhaseBox from './SinglePhaseBox';
import {v4 as uuidv4} from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { NewRecipeContext } from '../../contexts/NewRecipeContextProvider';

function AddPhase() {
    const [addedPhases, setAddedPhases] = useState([])
    const {newRecipe} = useContext(NewRecipeContext)

    const phaseSkeleton = {
        "phaseIngredients": [],
        "phaseNumber": 0,
        "description": "",
        "phaseImageUrl": ""
    }

    const newPhase = function(){
        const tempId = uuidv4()
        setAddedPhases([...addedPhases, tempId])
    }

    useEffect(() => {console.log(newRecipe)},[newRecipe])

    return ( 
        <>
            <Button onClick={newPhase}>
                Aggiungi Fase
            </Button>
            <Row>
                <Col>
                    {addedPhases.map(pId => <SinglePhaseBox 
                                            key={pId} 
                                            phaseId={pId}
                                            addedPhases={addedPhases}
                                            setAddedPhases={setAddedPhases}
                                            /> )}
                </Col>
            </Row>
        </>
    );
}

export default AddPhase;