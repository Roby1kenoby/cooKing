import { useEffect, useState } from 'react';
import './Profile.css'
import { Button, Col, Container, DropdownButton, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination';
import { Link, useParams } from 'react-router-dom';
import { getUserData } from '../../apis/userCRUDS';
import RecipePreviewContainer from '../../components/Recipe/RecipePreviewContainer';
import SearchBar from '../../components/Interface/SearchBar';
import TagBox from '../../components/Tag/TagBox';
import SearchIngredientBox from '../../components/Ingredient/SearchIngredientBox';

function Profile() {
    const params = useParams()
    const userId = params.profileId
    const [tags, setTags] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [searchVal, setSearchVal] = useState('')

    const [userData, setUserData] = useState()

    const fetchUserData = async function () {
        try {
            const resp = await getUserData(userId)
            if (!resp) {
                console.log('resp non ancora presente)')
            }
            const userData = await resp.json()
            setUserData(userData)
        } catch (error) {
            return error
        }
    }

    useEffect(() => { fetchUserData() }, [userId])


    if (!userData) {
        return <p>Loading...</p>
    }

    return (
        <Container className='mainContainer'>
            <Row className='userData'>
                <Col sm="12" md="6" className="d-flex flex-column align-items-center">
                    <div className='avatarContainer'>
                        <img src={userData.avatarUrl} className='img-fluid avatar'></img>
                    </div>
                </Col>
                <Col sm="12" md="6" className="d-flex flex-column align-items-center">
                    <h2>Benvenut*, <p>{`\n${userData.surname} ${userData.name} `}</p></h2>
                    <Button
                        as={Link}
                        to={'/recipe/newRecipe'}
                        className='btn-big btn-primary'
                    >
                        Crea nuova ricetta
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm="12" md="6" className="d-flex flex-column align-items-center">
                    <div className='tagSearch'>
                        <SearchBar optionsArray={tags} setOptionsArray={setTags} type={'tagsSearch'} />
                        <TagBox
                            tags={tags}
                            setTags={setTags}
                            canEdit={true}
                        />
                    </div>
                </Col>
                <Col sm="12" md="6" className="d-flex flex-column align-items-center">
                    <div className='ingredientSearch'>
                        <SearchBar optionsArray={ingredients} setOptionsArray={setIngredients} type={'ingredientsSearch'} />
                        <SearchIngredientBox 
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            canEdit={true}
                        />
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className='recipeContainer'>
                    <h1>Le tue ricette</h1>
                    <input 
                        type="search" 
                        placeholder="Cerca per titolo!" 
                        className='recipeSearch text-form-field' 
                        value={searchVal} // Collega il valore di input allo stato
                        onChange={(e) => setSearchVal(e.target.value)}
                        />
                    <RecipePreviewContainer userId={userData._id} 
                        tags={tags} 
                        ingredients={ingredients}
                        searchValue={searchVal} />
                </Col>
            </Row>

        </Container>
    );
}

export default Profile;