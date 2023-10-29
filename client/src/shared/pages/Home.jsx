import { Link } from 'react-router-dom'

import './Home.css'

export default function Home() {
  return (
    <div className='home-container text-center'>
      <div className='mt-5'>
        <h1 className='heading l1 m-2'>Welcome to MintCode</h1>
        <h3 className='heading l2 m-1'>Start solving problems</h3>
      </div>
      <Link to="/problems" className='btn btn-grad'>problems</Link>

    </div>
  )
}
