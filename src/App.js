import React from "react";
import "./App.scss";
import SubmitReplayForm from "./SubmitReplayForm";
import Guy from "./Guy";
import { CerebrateNavbar } from "./CerebrateNavbar";
import { Card, Elevation } from "@blueprintjs/core";

const EXAMPLE_TAGS = [
  "player:terran",
  "player:protoss",
  "player:zerg",
  "player:macro",
  "player:all_in",
  "player:2_base_all_in",
  "player:mech",
  "player:bio",
  "player:stargate",
  "player:twilight",
  "player:dt",
  "player:mass_pheonix",
  "player:mass_void_ray",
  "player:air_toss",
  "player:cannon_rush",
  "player:proxy_barracks",
  "player:proxy_hatch",
  "player:winner",
  "player:loser",

  "opponent:terran",
  "opponent:protoss",
  "opponent:zerg",
  "opponent:macro",
  "opponent:all_in",
  "opponent:2_base_all_in",
  "opponent:mech",
  "opponent:bio",
  "opponent:stargate",
  "opponent:twilight",
  "opponent:dt",
  "opponent:mass_pheonix",
  "opponent:mass_void_ray",
  "opponent:air_toss",
  "opponent:cannon_rush",
  "opponent:proxy_barracks",
  "opponent:proxy_hatch",
  "opponent:winner",
  "opponent:loser",

  "game:zvp",
  "game:zvt",
  "game:zvz",
  "game:tvz",
  "game:tvp",
  "game:tvt",
  "game:pvt",
  "game:pvz",
  "game:pvp",
  "game:short",
  "game:long",
  "game:basetrade",
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replayId: "",
      replayFileName: "",
      replayTimestamp: null,
      replayData: "",
      teams: [],
      playerTeam: null,
      opponentTeam: null,
      selectedTags: [],
      formDisabled: true,
      failedToLoadReplay: false,
      failedToTagReplay: false,
      submittingReplay: false,
      notes: "",

      setReplayId: (replayId) => this.setState({ replayId: replayId }),

      setReplayFileName: (replayFileName) =>
        this.setState({ replayFileName: replayFileName }),

      setReplayData: (replayData) => this.setState({ replayData: replayData }),

      setPlayerTeam: (index) => this.setState({ playerTeam: index }),

      setOpponentTeam: (index) => this.setState({ opponentTeam: index }),

      setSelectedTags: (selectedTags) =>
        this.setState({ selectedTags: selectedTags }),

      setNotes: (notes) => this.setState({ notes: notes }),

      resetAndDisableForm: () =>
        this.setState({
          failedToLoadReplay: false,
          replayId: "",
          replayTimestamp: null,
          teams: [],
          playerTeam: null,
          opponentTeam: null,
          selectedTags: [],
          notes: "",
          formDisabled: true,
        }),

      disableForm: () => this.setState({formDisabled: true}),

      updateReplayInfo: () => {
        this.setState({
          formDisabled: true,
          submittingReplay: true,
        });
        Guy.updateReplayInfo({
          replayId: this.state.replayId,
          replayData: this.state.replayData,
          selectedTags: this.state.selectedTags,
          playerTeam: this.state.playerTeam,
          opponentTeam: this.state.opponentTeam,
          notes: this.state.notes,
        });
      },
    };
  }

  componentDidMount() {
    Guy.onReplayLoadedListeners.push(this);
    Guy.onReplayUpdatedListeners.push(this);
  }

  componentWillUnmount() {
    Guy.onReplayLoadedListeners.splice(
      Guy.onReplayLoadedListeners.indexOf(this),
      1
    );
    Guy.onReplayUpdatedListeners.splice(
      Guy.onReplayUpdatedListeners.indexOf(this),
      1
    );
  }

  onReplayLoaded({
    replayId,
    replayFileName,
    replayTimestamp,
    teams,
    playerTeam,
    opponentTeam,
    selectedTags,
    notes,
    force,
  }) {
    if (!force && this.state.replayId !== replayId) {
      this.setState({
        formDisabled: true,
        submittingReplay: false,
        failedToLoadReplay: true,
        replayId: "",
        teams: [],
        playerTeam: null,
        opponentTeam: null,
        replayTimestamp: null,
        selectedTags: [],
        notes: "",
      });
      return;
    }

    this.setState({
      formDisabled: false,
      submittingReplay: false,
      failedToLoadReplay: false,
      replayTimestamp: replayTimestamp,
      teams: teams,
      playerTeam: playerTeam,
      opponentTeam: opponentTeam,
      replayFileName: replayFileName || this.state.replayFileName,
      selectedTags: selectedTags,
      notes: notes,
    });
  }

  onReplayUpdated({ success, replayId }) {
    this.setState({ submittingReplay: false });

    if (this.state.replayId === replayId) {
      this.setState({ failedToTagReplay: !success, formDisabled: false });
    }
  }

  render() {
    return (
      <div className="App">
        <Card
          interactive={true}
          elevation={Elevation.TWO}
          className={"SubmitReplayForm-card"}
        >
          <CerebrateNavbar />
          <SubmitReplayForm tags={EXAMPLE_TAGS} {...this.state} />
        </Card>
      </div>
    );
  }
}

export default App;
