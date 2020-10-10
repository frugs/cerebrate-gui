import React from "react";
import { FormGroup, HTMLSelect, Intent } from "@blueprintjs/core";

import "./SelectPlayerandOpponentInput.css";

import Guy from "./Guy";

export class SelectPlayerAndOpponentInput extends React.Component {
  onPlayerSelected(event) {
    let {
      replayId,
      teams,
      setPlayerTeam,
      setOpponentTeam,
      disableForm,
    } = this.props;
    let choice = parseInt(event.currentTarget.value);
    if (choice < 0) {
      setPlayerTeam(null);
      return;
    }

    setPlayerTeam(choice);
    let playerTeam = choice;

    let opponentTeam = null;
    if (teams.length === 2) {
      let inverseChoice = choice === 0 ? 1 : 0;
      setOpponentTeam(inverseChoice);
      opponentTeam = inverseChoice;
    }

    disableForm();

    Guy.selectPlayerOpponent({
      replayId: replayId,
      playerTeam: playerTeam,
      opponentTeam: opponentTeam,
    });
  }

  onOpponentSelected(event) {
    let {
      replayId,
      teams,
      setPlayerTeam,
      setOpponentTeam,
      disableForm,
    } = this.props;
    let choice = parseInt(event.currentTarget.value);
    if (choice < 0) {
      setOpponentTeam(null);
      return;
    }

    setOpponentTeam(choice);
    let opponentTeam = choice;

    let playerTeam = null;
    if (teams.length === 2) {
      let inverseChoice = choice === 0 ? 1 : 0;
      setPlayerTeam(inverseChoice);
      playerTeam = inverseChoice;
    }

    disableForm();

    Guy.selectPlayerOpponent({
      replayId: replayId,
      playerTeam: playerTeam,
      opponentTeam: opponentTeam,
    });
  }

  render() {
    let { formDisabled, teams, playerTeam, opponentTeam } = this.props;
    return (
      <div className={"SelectPlayerAndOpponentInput-container"}>
        <FormGroup
          className={
            "SelectPlayerAndOpponentInput-form-group SelectPlayerAndOpponentInput-form-group-player"
          }
          label={"Player"}
        >
          <HTMLSelect
            disabled={formDisabled}
            fill={true}
            iconProps={{ intent: Intent.SUCCESS }}
            options={[{ label: "Choose player...", value: "-1" }].concat(
              teams.map((team, index) => {
                return { label: team, value: index.toString() };
              })
            )}
            value={playerTeam !== null ? playerTeam.toString() : "-1"}
            onChange={(event) => this.onPlayerSelected(event)}
          />
        </FormGroup>
        <FormGroup
          className={"SelectPlayerAndOpponentInput-form-group"}
          label={"Opponent"}
        >
          <HTMLSelect
            disabled={formDisabled}
            fill={true}
            iconProps={{ intent: Intent.DANGER }}
            options={[{ label: "Choose opponent...", value: "-1" }].concat(
              teams.map((team, index) => {
                return { label: team, value: index.toString() };
              })
            )}
            value={opponentTeam !== null ? opponentTeam.toString() : "-1"}
            onChange={(event) => this.onOpponentSelected(event)}
          />
        </FormGroup>
      </div>
    );
  }
}
