import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";

function NavBar() {
  const [navLinks] = useState([
    { url: '/stores', name: "Stores Location" },
    { url: '/loan-data', name: 'Loan Data' },
    { url: '/earthquake', name: 'Earth Quake Graph' },
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