import { Col, Container, Row } from "react-bootstrap";
import IngredientBox from "../Ingredient/IngredientBox";
import './Phase.css'

function Phase({ phase }) {

    console.log(phase._id, phase.phaseImageUrl)
    return (
        <Container className="phase-container d-flex">
            <Row>
                <Col sm={12} md={3} className="phase-image-col d-flex align-items-cemter">
                    <img src={phase.phaseImageUrl} alt={phase.title} />
                </Col>
                <Col sm={12} md={9}>
                    <Row>
                        <IngredientBox ingredients={phase.phaseIngredients} />
                        <div>
                            <h5>Istruzioni</h5>
                            <p>{phase.description}</p>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Phase;