import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'

import { version as frontEndVersion } from '../package.json'

function App () {
  const [people, setPeople] = useState([])
  const [version, setVersion] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/people')
      .then(res => res.json())
      .then(body => setPeople(body._embedded.people))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/version')
      .then(res => res.json())
      .then(body => setVersion(body._embedded.version))
  }, [])

  if (!people.length || !version.length) {
    return null
  }

  return (
    <Container className='App'>
      <h1>People Store </h1>
      <Table striped bordered size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {people.map(({ firstName, lastName }, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Versions</h2>
      <Table size='sm' striped bordered>
        <thead>
          <tr>
            <th>Environment</th>
            <th>FE Version</th>
            <th>BE Version</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Badge variant='primary'>{version[0].environmentName}</Badge>
            </td>
            <td>
              <Badge variant='success'>{frontEndVersion}</Badge>
            </td>
            <td>
              <Badge variant='success'>{version[0].version}</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default App
