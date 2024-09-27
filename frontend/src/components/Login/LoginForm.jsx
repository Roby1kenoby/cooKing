import { Button, Container, Form } from 'react-bootstrap';
import './LoginForm.css'
import { useContext, useState } from 'react';
import { Login } from '../../apis/loginCRUDS';
import { LoginContext } from '../../contexts/LoginContextProvider';

function LoginForm() {
    const initialFormData = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    const {setToken, setLoggedUser} = useContext(LoginContext)

    const updateFormData = function(event){
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const login = async function(){
        const data = await Login(formData)
        console.log(data)
        if(!data){
            console.log('errore nel login')
        }
        setToken(data.jwtToken)
        setLoggedUser(data.userData)
    }

    return ( 
        <Container>
            <h1>Effettua il login</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email'
                        name='email'
                        placeholder='email'
                        value={formData.email}
                        onChange={updateFormData}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={updateFormData}
                        required />
                </Form.Group>
                    <Button variant='primary' onClick={login}>
                        Login
                    </Button>
            </Form>
        </Container>
    );
}

export default LoginForm;