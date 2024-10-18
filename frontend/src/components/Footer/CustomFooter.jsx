import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CustomFooter.css'; 

function CustomFooter() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center">
                        <h5>Seguimi sui Social</h5>
                        <div className="footer-links">
                            <a href="https://www.linkedin.com/in/roberto-allocco-a6a00021/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <span> | </span>
                            <a href="https://github.com/Roby1kenoby" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default CustomFooter;
