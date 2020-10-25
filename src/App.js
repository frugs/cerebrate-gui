import React from "react";
import "./App.scss";
import { SubmitReplayForm } from "./SubmitReplayForm";
import { Guy } from "./Guy";
import { CerebrateNavbar } from "./CerebrateNavbar";
import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import { FindReplays } from "./FindReplays";
import { concatExampleTags } from "./ExampleTags";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replayId: "",
      setReplayId: (replayId) => this.setState({ replayId: replayId }),

      replayFileName: "",
      setReplayFileName: (replayFileName) =>
        this.setState({ replayFileName: replayFileName }),

      replayTimestamp: null,

      replayData: "",
      setReplayData: (replayData) => this.setState({ replayData: replayData }),

      teams: [],

      playerTeam: null,
      setPlayerTeam: (index) => this.setState({ playerTeam: index }),

      opponentTeam: null,
      setOpponentTeam: (index) => this.setState({ opponentTeam: index }),

      replaySelectedTags: [],
      setReplaySelectedTags: (replaySelectedTags) =>
        this.setState({ replaySelectedTags: replaySelectedTags }),

      notes: "",
      setNotes: (notes) => this.setState({ notes: notes }),

      formDisabled: true,
      disableForm: () => this.setState({ formDisabled: true }),

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

      failedToLoadReplay: false,
      failedToTagReplay: false,
      submittingReplay: false,

      navbarTabId: "form",
      setNavbarTabId: (navbarTabId) => {
        this.setState({ navbarTabId: navbarTabId });
      },

      suggestTags: [],

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
        suggestTags: concatExampleTags(
          tagFrequencyTable.map((entry) => entry.tag)
        ),
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
        <Card elevation={Elevation.TWO} className={"App-card"}>
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
