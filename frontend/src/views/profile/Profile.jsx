import { useContext, useEffect, useState } from 'react';
import './Profile.css'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../apis/userCRUDS';
import { LoginContext } from '../../contexts/LoginContextProvider';

function Profile() {
    console.log('sono in profile')
    const params = useParams()
    const userId = params.profileId
    const navigate = useNavigate()
    
    const {token, loggedUser} = useContext(LoginContext)

    const [userData, setUserData] = useState()
    
    const fetchUserData = async function(){
        try {
            console.log(userId)
            const resp = await getUserData(userId)
            if(!resp){
                console.log('resp non ancora presente)')
            }
            const userData = await resp.json()
            setUserData(userData)
        } catch (error) {
            return error
        }
        
    }
        
    useEffect(() => {fetchUserData()}, [userId])

    if(!userData){
        return <p>Loading...</p>
    } 

    return (
        <Container>
            <Row>
                <Col sm="12" md="6">
                    <img src={userData.avatarUrl}></img>
                </Col>
                <Col sm="12" md="6">
                    <h1>{`${userData.surname} ${userData.name} `}</h1>
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