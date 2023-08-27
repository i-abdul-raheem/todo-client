import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export const UpdateModal = ({ id, getData }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/${id}`, { title })
      .then(() => {
        setShow(false);
        setLoading(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useLayoutEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/${id}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setShow(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor='titleUpdate'>Title</Form.Label>
            <Form.Control
              name='title'
              placeholder='Enter Title'
              id='titleUpdate'
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type='submit'>
            {loading ? 'Wait...' : 'Update'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
