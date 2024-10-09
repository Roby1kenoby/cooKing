import { Container } from "react-bootstrap";

function TagBox({tags}) {
    console.log(tags)
    return ( 
        <Container>
            {tags.map(tag => 
                <div key={tag._id}>{tag.tagName}</div>
            )}
        </Container>
    );
}

export default TagBox;