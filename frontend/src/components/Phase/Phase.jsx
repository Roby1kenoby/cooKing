import { Col, Container, Row } from "react-bootstrap";
import IngredientBox from "../Ingredient/IngredientBox";

function Phase({ phase }) {
    return (
        <Container>
            <Row>
                <Col sm={12} md={4}>
                    <img src={phase.phaseImageUrl} alt="" />
                </Col>
                <Col sm={12} md={4}>
                    <IngredientBox ingredients={phase.phaseIngredients} />
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={4}>
                    {phase.description}
                </Col>
            </Row>

        </Container>
    );
}

export default Phase;