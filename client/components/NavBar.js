import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to='/'> Home </Link>
            </li>
            <li>
              <Link to='/seller'> Sellers </Link>
            </li>
            <li>
              <Link to='/buyers'> Buyers </Link>
            </li>
            <li>
              <Link to='/signIn'> Sign In </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;

{/* <li>
              <Link to='/cart'>
              {/* <Image src="carts.png"/> */}
               {/* </Link>
          //  </li> */} 
