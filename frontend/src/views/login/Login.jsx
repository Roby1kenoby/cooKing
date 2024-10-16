import { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import RegisterForm from '../../components/Login/RegisterForm';
import './Login.css'
import { Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import LoginOauth from '../../components/Login/LoginOauth';
import testImage from '../../assets/single-logo.png';

function Login() {
    const [switchForm, setSwitchForm] = useState(false)
    
    return (
        <Container className='d-flex flex-column align-items-center'>
            <div className='logoContainer'>
                <img src={testImage} className='img-fluid'/>
                <hr></hr>
                <p>Che si cucina oggi?</p>
            </div>
            <div>
                {!switchForm && <LoginForm />}
                {switchForm && <RegisterForm switchForm={switchForm} setSwitchForm={setSwitchForm}/>}
            </div>
            <div className='switchForm'>
                {!switchForm && <Link variant="secondary" onClick={()=>{setSwitchForm(!switchForm)}}
                    as="Button">
                    Clicca qui per registrarti!
                </Link>}
                {switchForm && <Link variant="secondary" onClick={()=>{setSwitchForm(!switchForm)}}
                    as="Button">
                    Hai già un account? Clicca qui per accedere!
                </Link>}
            </div>
            <LoginOauth />
            
        </Container>
    );
}

export default Login;