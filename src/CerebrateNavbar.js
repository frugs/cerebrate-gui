import React from "react";
import { Alignment, Navbar, Tab, Tabs } from "@blueprintjs/core";

import "./CerebrateNavbar.scss";

export class CerebrateNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarTabId: "Home",
    };
  }

  render() {
    return (
      <Navbar className={"CerebrateNavbar-navbar"}>
        <Navbar.Group>
          <Navbar.Heading className={"CerebrateNavbar-navbar-heading"}>
            <div>
              <div className={"CerebrateNavbar-logo"}>Cerebrate</div>
              <em className={"CerebrateNavbar-logo-subtitle"}>
                A StarCraft II Replay Manager
              </em>
            </div>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Tabs
            animate={true}
            id="navbar"
            large={true}
            selectedTabId={this.state.navbarTabId}
            onChange={(newTabId) => this.setState({ navbarTabId: newTabId })}
          >
            <Tab id="form" title="Replay Details" />
            <Tab id="search" title="Find Replay" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    );
  }
}
