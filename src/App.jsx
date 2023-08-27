import { useLayoutEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { BiEdit, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import './App.css';
import { UpdateModal } from './Update';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/')
      .then((res) => {
        setData(res?.data?.data);
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
    const formData = new FormData(e.currentTarget);
    axios
      .post(
        'http://localhost:5000/',
        { title: formData.get('title') },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        alert(res.data.message);
        setLoading(false);
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
      axios
        .delete(`http://localhost:5000/${id}`)
        .then((res) => {
          alert(res?.data?.message);
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
              placeholder='Enter Title'
              required
            />
          </Form.Group>
          <Button
            disabled={loading}
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
      <UpdateModal getData={getData} id={id} />
    </>
  );
}
