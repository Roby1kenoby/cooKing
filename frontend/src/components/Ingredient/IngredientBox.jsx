import { Col, Row } from 'react-bootstrap';
import './IngredientBox.css'

function IngredientBox({ ingredients }) {
    return (
        <>
            <Row className='row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4'>
                {ingredients.map((i) =>
                    <Col key={i._id}>
                        <div className='d-flex align-baseline'>
                            <input type='checkbox' />
                            <span>{i.quantity} {i.measurementUnit} {i.ingredientId.name}</span>
                        </div>
                        <p>{i.additionalInfos}</p>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default IngredientBox;