import './AddPhase.css'
import { Button, Col, Row } from 'react-bootstrap';
import SinglePhaseBox from './SinglePhaseBox';
import {v4 as uuidv4} from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { NewRecipeContext } from '../../contexts/NewRecipeContextProvider';

function AddPhase() {
    const [addedPhases, setAddedPhases] = useState([])
    const {newRecipe, setNewRecipe} = useContext(NewRecipeContext)


    const newPhase = function(){
        const tempId = uuidv4()
        setAddedPhases([...addedPhases, tempId])
    }
    
    const updateRecipe = function(){
        const phases = addedPhases.map((pId, i) => {
            // for each phase i search if it already exists, than add a new "void" phase
            // or keep the one already present with it's data
            const existingPhase = newRecipe.phases.find(ph => ph.tempId === pId)
            const singlePhase = {
            tempId : existingPhase?.tempId || pId,
            description: existingPhase?.description || '',
            phaseNumber: i+1,
            phaseIngredients : existingPhase?.phaseIngredients || []
            }
            return singlePhase
        })
        setNewRecipe(prevRecipe => ({...prevRecipe, phases: phases}))
    }

    useEffect(updateRecipe, [addedPhases])

    // useEffect(() => {console.log(newRecipe); console.log(addedPhases)},[newRecipe])

    return ( 
        <>
            <Button onClick={newPhase}>
                Aggiungi Fase
            </Button>
            <Row>
                <Col>
                    {newRecipe.phases?.map((p,i) => <SinglePhaseBox 
                                            key={p.tempId} 
                                            phase={p}
                                            addedPhases={addedPhases}
                                            setAddedPhases={setAddedPhases}
                                            /> )}
                </Col>
            </Row>
        </>
    );
}

export default AddPhase;