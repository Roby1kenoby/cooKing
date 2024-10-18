import { Carousel, Col, Container, Row } from 'react-bootstrap'
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

    const { token } = useContext(LoginContext)
    const params = useParams()
    const recipeId = params.recipeId

    const fetchRecipeData = async function () {
        try {
            const resp = await getRecipeData(token, recipeId)
            if (!resp) {
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



    useEffect(() => { fetchRecipeData() }, [])


    // return ( 
    //     <Container>
    //         <Row>
    //             <Col className='image container' style={headerStyle}>
    //                 <h1>{recipeData?.title}</h1>
    //             </Col>
    //             <hr />
    //         </Row>

    //         <Row>
    //             <h2>Descrizione</h2>
    //             <Col>
    //                 <p>{recipeData?.description}</p>
    //             </Col>
    //             <Col sm={12} md={4}>
    //                 <TagBox tags={tags}/>
    //             </Col>
    //             <hr />
    //         </Row>

    //         <Row>
    //             <h2>Ingredienti</h2>
    //             <p>Liquidi</p>
    //             <div className='liquidIngredients'>
    //                 <IngredientBox ingredients={liquidIngredients}></IngredientBox>
    //             </div>
    //             <p>Solidi</p>
    //             <div className='solidIngredients'>
    //                 <IngredientBox ingredients={solidIngredients}></IngredientBox>
    //             </div>
    //         </Row>
    //         <hr />
    //         <Row>
    //             <h2>Fasi</h2>
    //             <PhaseBox phasesArray={phases}/>
    //         </Row>

    //     </Container>
    // );

    const headerStyle = {
        backgroundImage: `url(${recipeData?.recipeImageUrl})`
    }

    return (
        <Container className='mainContainer'>
            <Row>
                <Col className='recipe-header' style={headerStyle} >
                    <div className='recipe-title'>
                        <h1>{recipeData?.title}</h1>
                    </div>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h2>Descrizione</h2>
                    <p className='recipeDescription'>{recipeData?.description}</p>
                </Col>
                <Col sm={12} md={4}>
                    <TagBox tags={tags} />
                </Col>
            </Row>
            <hr></hr>
            <Row className='mt-4 ingContainer'>
                <Col md={6} >
                    <h3 className='title'>Ingredienti Liquidi</h3>
                    <IngredientBox ingredients={liquidIngredients}></IngredientBox>
                </Col>
                <Col md={6} >
                    <h3 className='title'>Ingredienti Solidi</h3>
                    <IngredientBox ingredients={solidIngredients}></IngredientBox>
                </Col>
            </Row>
            <Row className='mt-4'>
                <h2>Fasi</h2>
                <Col>
                    <Carousel indicators={false} controls={true} interval={null}>
                        {phases.map((phase, index) => (
                            <Carousel.Item key={index}>
                                <PhaseBox phasesArray={[phase]} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default Recipe;