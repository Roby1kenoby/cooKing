import { Carousel, Container } from 'react-bootstrap'
import './PhaseBox.css'
import Phase from './Phase';

function PhaseBox({ phasesArray }) {
    console.log(phasesArray)
    return (
        <Carousel
            controls={true}
            interval={null}
            indicators={true}
            keyboard={true}
            touch={true}>
            {phasesArray.map((phase) => 
                <Carousel.Item key={phase._id}>
                    <Phase phase={phase}/>
                </Carousel.Item>
            )}
        </Carousel>
    );
}

export default PhaseBox;