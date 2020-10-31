import React from "react";
import i18next from "i18next";
import { Alignment, Button, Navbar } from "@blueprintjs/core";

import "./CerebrateNavbar.scss";

export class CerebrateNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarTabId: "Home",
    };
  }

  render() {
    const { t } = this.props;

    return (
      <Navbar className={"CerebrateNavbar-navbar"}>
        <Navbar.Group>
          <Navbar.Heading className={"CerebrateNavbar-navbar-heading"}>
            <div>
              <div className={"CerebrateNavbar-logo"}>
                <ruby>
                  Cerebrate<rt>{t("logoRuby")}</rt>
                </ruby>
              </div>
              <em className={"CerebrateNavbar-logo-subtitle"}>
                {t("logoSubtitle")}
              </em>
            </div>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            minimal={true}
            onClick={async () => await i18next.changeLanguage("en")}
          >
            🇬🇧
          </Button>
          <Button
            minimal={true}
            onClick={async () => await i18next.changeLanguage("ja")}
          >
            🇯🇵
          </Button>
        </Navbar.Group>
      </Navbar>
    );
  }
}
