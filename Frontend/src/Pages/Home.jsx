import React from 'react'
import Container from '../components/Container.jsx'
import Left from '../components/Left.jsx'
import Right from '../components/Right.jsx'
function Home() {
  return (
    <Container className='text-white h-lvh flex p-3 gap-2'>
    <Left/>
    <Right/>
    </Container>
  )
}

export default Home