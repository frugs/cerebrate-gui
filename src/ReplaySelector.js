import React from "react";
import { FileInput } from "@blueprintjs/core";

const getFilename = (path) => path.split("\\").pop().split("/").pop();

class ReplaySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true,
      text: "Choose replay file...",
    };
  }

  render() {
    const { replayPath, setReplayPath } = this.props;

    return (
      <FileInput
        text={getFilename(replayPath)}
        onInputChange={(event) => setReplayPath(event.target.value)}
      />
    );
  }
}

export default ReplaySelector;
