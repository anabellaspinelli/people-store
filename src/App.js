import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'

import { version as frontEndVersion } from '../package.json'

function App () {
  const [people, setPeople] = useState()
  const [envData, setEnvData] = useState()

  useEffect(() => {
    fetch('http://localhost:8080/people')
      .then(res => res.json())
      .then(body => setPeople(body._embedded.people))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/version')
      .then(res => res.json())
      .then(body => setEnvData(body._embedded.version[0]))
  }, [])

  if (!people || !envData) {
    return null
  }

  const { environmentName, version: backendVersion } = envData

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
            <th>Front End Version</th>
            <th>Back End Version</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Badge variant='primary'>{environmentName}</Badge>
            </td>
            <td>
              <Badge variant='success'>{frontEndVersion}</Badge>
            </td>
            <td>
              <Badge variant='success'>{backendVersion}</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default App
