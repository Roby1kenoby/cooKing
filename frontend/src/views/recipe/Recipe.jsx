import { Col, Container, Row } from 'react-bootstrap'
import './Recipe.css'
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useParams } from 'react-router-dom';
import { getRecipeData } from '../../apis/recipeCRUDS';
import IngredientBox from '../../components/Ingredient/IngredientBox';
import PhaseBox from '../../components/Phase/PhaseBox';
import TagBox from '../../components/Tag/TagBox';

function Recipe() {
    const [recipeData, setRecipeData] = useState()

    const [liquidIngredients, setLiquidIngredients] = useState([])
    const [solidIngredients, setSolidIngredients] = useState([])
    const [tags, setTags] = useState([])
    const [phases, setPhases] = useState([])

    const {token} = useContext(LoginContext)
    const params = useParams()
    const recipeId = params.recipeId

    const fetchRecipeData = async function(){
        try {
            const resp = await getRecipeData(token, recipeId)
            if(!resp){
                console.log('resp non ricevuta)')
            }
            const data = await resp.json()
            console.log(data)
            setRecipeData(data)

            // managing ingredients arrays
            const solidArray = []
            const liquidArray = []

            data.recipeIngredients.map(ingredient => {
                ingredient.ingredientId.measurementCategory === 'Solid' 
                    ? solidArray.push(ingredient)
                    : liquidArray.push(ingredient)
            })

            setSolidIngredients(solidArray)
            setLiquidIngredients(liquidArray)
            setPhases(data.phases)
            setTags(data.tagsIds)
            
        } catch (error) {
            return error
        }
    }

    

    useEffect(() => {fetchRecipeData()},[])

    const headerStyle = {
        backgroundImage: `url(${recipeData?.recipeImageUrl})`
    }

    return ( 
        <Container>
            <Row>
                <Col className='image container' style={headerStyle}>
                    <h1>{recipeData?.title}</h1>
                </Col>
                <hr />
            </Row>
            
            <Row>
                <h2>Descrizione</h2>
                <Col>
                    <p>{recipeData?.description}</p>
                </Col>
                <Col sm={12} md={4}>
                    <TagBox tags={tags}/>
                </Col>
                <hr />
            </Row>

            <Row>
                <h2>Ingredienti</h2>
                <p>Liquidi</p>
                <div className='liquidIngredients'>
                    <IngredientBox ingredients={liquidIngredients}></IngredientBox>
                </div>
                <p>Solidi</p>
                <div className='solidIngredients'>
                    <IngredientBox ingredients={solidIngredients}></IngredientBox>
                </div>
            </Row>
            <hr />
            <Row>
                <h2>Fasi</h2>
                <PhaseBox phasesArray={phases}/>
            </Row>

        </Container>
    );
}

export default Recipe;