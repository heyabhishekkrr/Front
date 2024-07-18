import React from 'react'
import {Link} from 'react-router-dom';

 const Error = () => {
  return (
	<h1 style={{fontsize:"100px", textAlign:"center", padding:"33vh 0 0 0"}}>Error 404,  Page Not exist <Link to="/">Go Home</Link></h1>
  )
}
export default Error;