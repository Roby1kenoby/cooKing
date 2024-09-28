import { Button, Container, Form } from 'react-bootstrap';
import { createUser } from '../../apis/userCRUDS.js';
import './RegisterForm.css'
import { useState } from 'react';
import CustomModal from '../Modal/CustomModal.jsx';


function RegisterForm({switchForm, setSwitchForm}) {
    const initialFormData = {
        email: '',
        password: '',
        userName: '',
        name:'',
        surname:'',
        preferredMu:''
    }
    const [formData, setFormData] = useState(initialFormData)
    const [avatar, setAvatar] = useState()
    
    // modal state
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});


    const handleFormChange = function(event){
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }
    
    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0])
    }

    const createNewUser = async function(event){
        event.preventDefault()

        try {
            const createdUser = await createUser(formData, avatar)
            if (!createdUser){
                throw new Error('Errore nella creazione dell\'utente')
            }

            setModalTitle('Utente Creato!')
            setModalMessage(`L'utenza è stata creata con successo. 
                \nPremere ok per essere reindirizzati alla schermata di Login`)
            setOnConfirmAction(() => () => {
                setSwitchForm(!switchForm)
                setShowModal(false)
            })
        } catch (error) {
            setModalTitle('Errore')
            setModalMessage(`Non è possibile craere l'utente, riprovare più tardi.`)
            setOnConfirmAction(() => () => {
                setShowModal(false)
            })
        } finally {
            setShowModal(true)
        }
    }



    return (
        <Container>
            <h1>Registrati</h1>
            <Form onSubmit={createNewUser}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleFormChange}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        name="userName"
                        placeholder="Username"
                        value={formData.userName}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text"
                        name="surname"
                        placeholder="Cognome"
                        value={formData.surname}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file"
                        name="avatar"
                        onChange={handleAvatarChange}
                    />
                </Form.Group>
                <div className="loginButtonGroup">
                    <Button variant="primary" type='submit'>
                        Submit
                    </Button>
                </div>
            </Form>
            <CustomModal 
                show={showModal}
                title={modalTitle}
                message={modalMessage}
                onConfirm={onConfirmAction}
                onCancel={() => setShowModal(false)}  
                showAbortButton={false}
            />
        </Container>
    );
}

export default RegisterForm;