import React from "react";

import Header from "./Header";
import NavLinks from "./NavLinks";
import './Navigation.css';

const Navigation = () => { 
    return (
      <Header>
        <nav className="navigation">
          <NavLinks />
        </nav>
      </Header>
    );
}

export default Navigation;