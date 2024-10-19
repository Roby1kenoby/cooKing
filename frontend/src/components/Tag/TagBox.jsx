import { Badge, Container } from "react-bootstrap";
import './TagBox.css'
function TagBox({ tags, setTags, canEdit = false }) {

    const removeTag = function (tagId) {
        canEdit && setTags([...tags.filter(t => t._id !== tagId)])
    }


    return (
        <Container className="mt-2">
            <div className="badgeContainer">
                {tags?.map(tag =>
                    <Badge pill bg="success"
                        key={tag._id}
                        onClick={() => removeTag(tag._id)}
                        className="tag"
                    >
                        {tag.name}
                    </Badge>
                )}
            </div>
        </Container>
    );
}

export default TagBox;