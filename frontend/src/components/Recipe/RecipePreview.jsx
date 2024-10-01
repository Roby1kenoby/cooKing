import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './RecipePreview.css'

function RecipePreview({recipe}) {
    return (
        <Card>
            <CardHeader className='d-flex justify-content-between'>
                <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm="12" md="4">{recipe.recipeImageUrl}</Col>
                    <Col sm="12" md="4">{recipe.description}</Col>
                    <Col sm="12" md="4">{recipe.tagsIds}</Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default RecipePreview;