import { useEffect, useState } from 'react';
import './Profile.css'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../apis/userCRUDS';

function Profile() {
    const params = useParams()
    const userId = params.profileId
    const navigate = useNavigate()

    // if(!userId){
    //     navigate('/404')
    // }

    const [userData, setUserData] = useState()

    const getUserData = async function(){
        try {
            const fetchedUserData = await getUserData(userId)
            if(!fetchedUserData){
                throw new Error('Utente non trovato')
            }
            setUserData(fetchedUserData)
            console.log(fetchedUserData)
        } catch (error) {
            // navigate('/404')
        }
    }
    
    useEffect(() => {getUserData()}, [])

    return (
        <Container>
            <Row>
                <Col sm="12" md="6">
                    <h1>Profile image</h1>
                </Col>
                <Col sm="12" md="6">
                    <h1>Profile name</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm="12" md="6">
                    <input type="search" />
                    <DropdownButton title="Ricerca per Tag"></DropdownButton>
                    <DropdownButton title="Ricerca per Ingrediente"></DropdownButton>
                </Col>
                <Col sm="12" md="6">
                    <h1>Box tag più usati</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <h1>Ricette</h1>
                    <Card>
                        <CardHeader className='d-flex justify-content-between'>
                            <p>Nome Ricetta</p>
                            <p>Autore</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="4">Immagine</Col>
                                <Col sm="12" md="4">Descrizione</Col>
                                <Col sm="12" md="4">Tags</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='d-flex justify-content-between'>
                            <p>Nome Ricetta</p>
                            <p>Autore</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="4">Immagine</Col>
                                <Col sm="12" md="4">Descrizione</Col>
                                <Col sm="12" md="4">Tags</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='d-flex justify-content-between'>
                            <p>Nome Ricetta</p>
                            <p>Autore</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="4">Immagine</Col>
                                <Col sm="12" md="4">Descrizione</Col>
                                <Col sm="12" md="4">Tags</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='d-flex justify-content-between'>
                            <p>Nome Ricetta</p>
                            <p>Autore</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="4">Immagine</Col>
                                <Col sm="12" md="4">Descrizione</Col>
                                <Col sm="12" md="4">Tags</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='d-flex justify-content-between'>
                            <p>Nome Ricetta</p>
                            <p>Autore</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="4">Immagine</Col>
                                <Col sm="12" md="4">Descrizione</Col>
                                <Col sm="12" md="4">Tags</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>

        </Container>
    );
}

export default Profile;