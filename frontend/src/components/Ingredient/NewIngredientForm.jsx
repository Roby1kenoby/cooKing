import React, { useContext, useEffect, useState } from "react";
import _ from 'lodash';
import { Button, Form, FormControl, ListGroup, Row, Spinner } from "react-bootstrap";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { getAllIngredients } from "../../apis/ingredientCRUDS";
import {v4 as uuidv4} from 'uuid';
import units from '../../data/measurementUnits.json'

function NewIngredientForm({ setIngredients }) {
    const [searchTerm, setSearchTerm] = useState('');      // Search string
    const [options, setOptions] = useState([]);            // array for options returned by API call
    const [loading, setLoading] = useState(false);
    const { token } = useContext(LoginContext)
    const [selectedIngredient, setSelectedIngredient] = useState()
    const [mesUnits, setMesUnits] = useState([])

    const initialFormData = {
        ingredientId: '',
        measurementUnit: '',
        phaseId: '',
        quantity: '',
        additionalInfos: ''
    }

    // form state
    const [formData, setFormData] = useState(initialFormData)
    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    // handle the search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // actual fetch for ingredients
    const fetchOptions = async function (searchParams) {
        setLoading(true)
        const resp = await getAllIngredients(token, searchParams)
        setOptions(resp)
        setLoading(false)
    }

    // delayed fetch
    const delayedFetch = React.useCallback(_.debounce(fetchOptions, 500), [])

    // for the useEffect, only if 2 or more characters
    const engageSearch = function () {
        searchTerm.length >= 2 ? delayedFetch(searchTerm) : setOptions([])
    }

    useEffect(() => { engageSearch(searchTerm) }, [searchTerm, delayedFetch])

    // for selecting ingredients
    const handleSelect = function (selectedOpt) {
        console.log(selectedOpt)
        setSelectedIngredient(selectedOpt)
        // updating the form
        setFormData({ ...formData, ingredientId: selectedOpt._id })
        // setting the right measurement unit
        setMesUnits(selectedOpt.measurementCategory === 'Solid' ? 
            units.unitSystem.metric.solid : 
            units.unitSystem.metric.liquid)
        setSearchTerm('');  // Reset search bar
        setOptions([]);     // Reset options list
    }

    const addIngredient = function(){
        setIngredients(prevIng => ([...prevIng, {...formData, tempId: uuidv4()}]))
        setSelectedIngredient(null)
        setFormData(initialFormData)
    }

    return (
        // qui ci sarà il form di inserimento nuovo ingrediente, composto da
        // selettore ingrediente
        // campi qta um info
        // su salvataggio deve aggiornare l'array di ingredienti salvati
        <>
            <Row>
                <Form.Group>
                    <FormControl
                        placeholder="Cerca ingrediente"
                        value={searchTerm}
                        onChange={handleSearchChange} />
                </Form.Group>
                {loading && (
                    <div className="text-center mt-2">
                        <Spinner animation="border" size="sm" />
                    </div>
                )}
                {options?.length > 0 && (
                    <ListGroup style={{ zIndex: 1000, width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                        {options.map((opt) => (
                            <ListGroup.Item
                                key={opt._id}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                {searchTerm.length >= 2 && options?.length === 0 && !loading && (
                    <div className="text-center mt-2">
                        <small>Nessuna opzione trovata</small>
                    </div>
                )}
            </Row>
            {selectedIngredient &&
                <Row>
                    <h3>{selectedIngredient.name}</h3>
                    <Form.Group>
                        <Form.Label>Qta</Form.Label>
                        <Form.Control type="numeric"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Um</Form.Label>
                        <Form.Select 
                            name="measurementUnit"
                            value={formData.measurementUnit}
                            onChange={handleFormChange}
                            required
                            >
                            {mesUnits.map(u => 
                                <option key={u.name} value={u.name}>{u.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Altre informazioni</Form.Label>
                        <Form.Control type="text"
                            name="additionalInfos"
                            value={formData.additionalInfos}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <div>
                        <Button onClick={addIngredient}>
                            Aggiungi
                        </Button>
                    </div>
                </Row>
            }
        </>

    );
}

export default NewIngredientForm;