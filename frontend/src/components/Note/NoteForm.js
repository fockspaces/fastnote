import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, tags });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="noteFormTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="noteFormTags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value.split(","))}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Note
      </Button>
    </Form>
  );
};

export default NoteForm;
