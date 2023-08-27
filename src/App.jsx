import { useLayoutEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Table,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { BiEdit, BiTrash } from 'react-icons/bi';
import './App.css';
import { UpdateModal } from './Update';
import { addOne, deleteOne, getAll } from './api';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [toast, setToast] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);
  const getData = () => {
    setLoading(true);
    getAll()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData([]);
      });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    addOne({ title })
      .then((res) => {
        setToastMsg(res.message);
        setToast(true);
        setLoading(false);
        setTitle('');
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const deleteItem = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const flag = confirm('Delete item?');
    if (flag) {
      setLoading(true);
      deleteOne(id)
        .then((res) => {
          setToastMsg(res?.message);
          setToast(true);
          setLoading(false);
          getData();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setData([]);
        });
    }
  };
  useLayoutEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Container className='App p-3'>
        <h1>TODO APP</h1>
        <Form className='mb-3' style={{ width: '100%' }} onSubmit={handleAdd}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='title'>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter Title'
              required
            />
          </Form.Group>
          <Button
            disabled={loading || title.length < 1}
            variant='primary'
            type='submit'
            style={{ width: '100%' }}
          >
            {loading ? 'Wait...' : 'Add'}
          </Button>
        </Form>
        <Table responsive striped hover style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((_, index) => (
                <tr key={index}>
                  <td>{_?.title}</td>
                  <td>
                    <Button
                      onClick={() => setId(_?._id)}
                      disabled={loading}
                      variant='secondary'
                    >
                      {loading ? 'Wait...' : <BiEdit />}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteItem(_?._id)}
                      disabled={loading}
                      variant='danger'
                    >
                      {loading ? 'Wait...' : <BiTrash />}
                    </Button>
                  </td>
                </tr>
              ))}
            {data.length < 1 && (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={3}>
                  No items found!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <UpdateModal
        getData={getData}
        id={id}
        setId={setId}
        setToast={setToast}
        setToastMsg={setToastMsg}
      />
      <ToastContainer
        className='p-3'
        position={'bottom-start'}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>System</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
