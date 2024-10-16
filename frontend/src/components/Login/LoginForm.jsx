import { Alert, Button, Container, Form } from 'react-bootstrap';
import './LoginForm.css'
import { useContext, useState } from 'react';
import { Login } from '../../apis/loginCRUDS';
import { LoginContext } from '../../contexts/LoginContextProvider';
import CustomToast from '../Toast/CustomToast';

function LoginForm() {
    const initialFormData = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    const { setToken, setLoggedUser } = useContext(LoginContext)

    // alert state
    const [show, setShow] = useState(false);

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const login = async function () {
        try {
            const data = await Login(formData)
            if (!data) {
                throw new Error('Errore nel login, verificare email e password')
            }

            localStorage.setItem('token', data.jwtToken)
            setToken(data.jwtToken)
            setLoggedUser(data.userData)

        } catch (error) {
            console.log(error)
            setShow(true)
        }




    }

    return (
        <>
            <Container>
                <hr></hr>
                <h1 className='loginTitle'>Effettua il login</h1>
                <Form className='form-border'>
                    <Form.Group>
                        {/* <Form.Label>Email</Form.Label> */}
                        <Form.Control
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleFormChange}
                            required 
                            className='text-form-field'/>
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleFormChange}
                            required 
                            className='text-form-field'/>
                    </Form.Group>
                    <Button className='btn-primary loginButton' onClick={login}>
                        Login
                    </Button>
                </Form>
            </Container>
            {show &&
                <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                    Informazioni errate, inserire email e password corrette!
                </Alert>}
        </>
    );
}

export default LoginForm;