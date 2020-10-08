import React from "react";
import "./App.scss";
import SubmitReplayForm from "./SubmitReplayForm";

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
      selectedTags: [],

      setSelectedTags: (selectedTags) =>
        this.setState({ selectedTags: selectedTags }),
    };
  }

  render() {
    return (
      <div className="App">
        <SubmitReplayForm tags={EXAMPLE_TAGS} {...this.state} />
      </div>
    );
  }
}

export default App;
