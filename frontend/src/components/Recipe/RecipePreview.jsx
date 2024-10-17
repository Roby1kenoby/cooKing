import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './RecipePreview.css'
import TagBox from '../Tag/TagBox';

function RecipePreview({ recipe }) {
    return (
        <Card className='cardRecipe'>
            <CardHeader className='d-flex justify-content-between bg-accent'>
                <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
            </CardHeader>
            <CardBody className="recipeBody">
                <Row>
                    <Col sm="12" md="3" className="imageCol">
                        <img
                            src={recipe.recipeImageUrl}
                            alt={recipe.title}
                            className="recipeImage"
                        />
                    </Col>
                    <Col sm="12" md="6" className="contentCol">
                        <div className="recipeTitle">
                            <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
                        </div>
                        <div className="recipeDescription">
                            {recipe.description}
                        </div>
                    </Col>
                    <Col sm="12" md="3" className="tagCol">
                        <TagBox tags={recipe.tagsIds} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default RecipePreview;