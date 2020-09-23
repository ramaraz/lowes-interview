import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";

function NavBar() {
  const [navLinks] = useState([
    { url: '/stores', name: "Lowe's stores" },
    { url: '/loan-data', name: 'Loan Data' },
  ]);
  return (<div className="menu active">
    <ul>
      {navLinks.map(({ url, name }) => (
        <li key={url}>
          <Link to={url}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>);
}

export default NavBar;