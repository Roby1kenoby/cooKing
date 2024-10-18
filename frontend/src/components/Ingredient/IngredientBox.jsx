import { Col, Row } from 'react-bootstrap';
import './IngredientBox.css'

function IngredientBox({ ingredients }) {
    return (
        <>
            <Row className='d-flex flex-column'>
                {ingredients?.map((i) =>
                    <Col key={i._id} className='w-100'>
                        <div className='d-flex align-baseline flex-wrap ingredientContainer'>
                            <Col sm={2} md={1} className='d-flex align-items-center'><input type='checkbox' className='ingredientCheckbox' /></Col>
                            <Col  sm={10} md={11} className='d-flex align-baseline flex-wrap ingredientContainer'>
                                <span className='ingredientQuantity'>{i.quantity}</span>
                                <span className='ingredientMu'>{i.measurementUnit}</span>
                                <span className='ingredientName'>{i.ingredientId.name?.toUpperCase()}</span>
                                <span className='ingredientInfos'>{i.additionalInfos ? `(${i.additionalInfos})` : ''}</span>
                            </Col>
                        </div>
                        <hr/>
                    </Col>
                )}
            </Row>
        </>
    );
    
}

export default IngredientBox;