import { useLayoutEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getOne, updateOne } from './api';

export const UpdateModal = ({ id, getData, setId, setToast, setToastMsg }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    updateOne(id, { title })
      .then((res) => {
        setShow(false);
        setLoading(false);
        setId(null);
        setToastMsg(res?.message);
        setToast(true);
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setId(null);
      });
  };
  useLayoutEffect(() => {
    if (id) {
      setLoading(true);
      getOne(id)
        .then((res) => {
          setTitle(res?.title);
          setShow(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setId(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        setId(null);
      }}
    >
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
