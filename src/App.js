import React from "react";
import "./App.scss";
import { SubmitReplayForm } from "./SubmitReplayForm";
import { Guy } from "./Guy";
import { CerebrateNavbar } from "./CerebrateNavbar";
import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import { FindReplays } from "./FindReplays";

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
      replaySelectedTags: [],
      notes: "",
      formDisabled: true,
      failedToLoadReplay: false,
      failedToTagReplay: false,
      submittingReplay: false,
      navbarTabId: "form",
      suggestTags: [],

      setReplayId: (replayId) => this.setState({ replayId: replayId }),

      setReplayFileName: (replayFileName) =>
        this.setState({ replayFileName: replayFileName }),

      setReplayData: (replayData) => this.setState({ replayData: replayData }),

      setPlayerTeam: (index) => this.setState({ playerTeam: index }),

      setOpponentTeam: (index) => this.setState({ opponentTeam: index }),

      setReplaySelectedTags: (replaySelectedTags) =>
        this.setState({ replaySelectedTags: replaySelectedTags }),

      setNotes: (notes) => this.setState({ notes: notes }),

      resetAndDisableForm: () =>
        this.setState({
          failedToLoadReplay: false,
          replayId: "",
          replayTimestamp: null,
          teams: [],
          playerTeam: null,
          opponentTeam: null,
          replaySelectedTags: [],
          notes: "",
          formDisabled: true,
        }),

      disableForm: () => this.setState({ formDisabled: true }),

      updateReplayInfo: () => {
        this.setState({
          formDisabled: true,
          submittingReplay: true,
        });
        Guy.updateReplayInfo({
          replayId: this.state.replayId,
          replayData: this.state.replayData,
          selectedTags: this.state.replaySelectedTags,
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

    (async () => {
      const { tagFrequencyTable } = await Guy.findReplays({});
      this.setState({
        suggestTags: tagFrequencyTable.map((entry) => entry.tag),
      });
    })();
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
    replayData,
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
        replaySelectedTags: [],
        notes: "",
      });
      return;
    }

    this.setState({
      replayId: replayId,
      replayData: replayData || this.state.replayData,
      formDisabled: false,
      submittingReplay: false,
      failedToLoadReplay: false,
      replayTimestamp: replayTimestamp,
      teams: teams,
      playerTeam: playerTeam,
      opponentTeam: opponentTeam,
      replayFileName: replayFileName || this.state.replayFileName,
      replaySelectedTags: selectedTags,
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
          className={"App-card"}
        >
          <CerebrateNavbar />
          <div className={"App-break"}>
            <br />
          </div>
          <Tabs
            animate={true}
            id="navbar"
            large={true}
            selectedTabId={this.state.navbarTabId}
            onChange={(newTabId) => this.setState({ navbarTabId: newTabId })}
          >
            <Tab
              id="form"
              title="Replay Details"
              panel={<SubmitReplayForm {...this.state} />}
            />
            <Tab
              id="search"
              title="Find Replays"
              panel={<FindReplays {...this.state} />}
            />
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default App;
