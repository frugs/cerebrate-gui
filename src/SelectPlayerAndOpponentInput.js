import React from "react";
import { FormGroup, HTMLSelect, Intent } from "@blueprintjs/core";

import "./SelectPlayerandOpponentInput.css";

import { Guy } from "./Guy";

class SelectPlayerAndOpponentInput extends React.Component {
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
    let { t, formDisabled, teams, playerTeam, opponentTeam } = this.props;
    return (
      <div className={"SelectPlayerAndOpponentInput-container"}>
        <FormGroup
          className={
            "SelectPlayerAndOpponentInput-form-group SelectPlayerAndOpponentInput-form-group-player"
          }
          label={t("submitReplayFormPlayerTeamLabel")}
        >
          <HTMLSelect
            disabled={formDisabled}
            fill={true}
            iconProps={{ intent: Intent.SUCCESS }}
            options={[
              {
                label: t("submitReplayFormChoosePlayerOptionLabel"),
                value: "-1",
              },
            ].concat(
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
          label={t("submitReplayFormOpponentTeamLabel")}
        >
          <HTMLSelect
            disabled={formDisabled}
            fill={true}
            iconProps={{ intent: Intent.DANGER }}
            options={[
              {
                label: t("submitReplayFormChooseOpponentOptionLabel"),
                value: "-1",
              },
            ].concat(
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

export default SelectPlayerAndOpponentInput;
