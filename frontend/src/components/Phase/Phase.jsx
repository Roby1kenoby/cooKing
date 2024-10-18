import { Col, Container, Row } from "react-bootstrap";
import IngredientBox from "../Ingredient/IngredientBox";
import './Phase.css'

function Phase({ phase }) {

    
    //     <Container>
    //         <Row>
    //             <Col sm={12} md={4}>
    //                 <img src={phase.phaseImageUrl} alt="" />
    //             </Col>
    //             <Col sm={12} md={4}>
    //                 <IngredientBox ingredients={phase.phaseIngredients} />
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Col sm={12} md={4}>
    //                 {phase.description}
    //             </Col>
    //         </Row>

    //     </Container>
    // );
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