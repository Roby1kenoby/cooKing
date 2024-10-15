import { Container } from "react-bootstrap";

function TagBox({tags}) {
    console.log(tags)
    return ( 
        <Container>
            {tags.map(tag => 
                <div key={tag._id}>{tag.name}</div>
            )}
        </Container>
    );
}

export default TagBox;