import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';

export default function Search(props) {

  const [search, setSearch] = React.useState('');

  return (
    <Container>
      <Form className="mt-2">
        <Form.Row className="align-items-center">
          <Col sm={10} className="my-1">
            <Form.Control 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="포켓몬 검색" />
          </Col>
          <Col sm={2} className="my-1">
            <Button block onClick={(e) => props.getPokemon(search)}>검색</Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  )
}