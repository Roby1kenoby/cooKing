import LoginForm from '../../components/Login/LoginForm';
import './Login.css'
import {Container} from 'react-bootstrap'

function Login() {
    return ( 
        <Container className='d-flex flex-column align-items-center'>
            <div>
                Logo
            </div>
            <div>
                <LoginForm />
            </div>
            <div>
                switch form
            </div>
            <div>
                login with oauth
            </div>
        </Container>
    );
}

export default Login;