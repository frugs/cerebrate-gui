import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { DateUtils } from "./DateUtils";

class ReplayDateFormGroup extends React.Component {
  render() {
    let { replayTimestamp } = this.props;
    return (
      <FormGroup label="Replay date">
        <InputGroup
          disabled={true}
          fill={true}
          value={replayTimestamp ? DateUtils.formatDate(replayTimestamp) : ""}
        />
      </FormGroup>
    );
  }
}

export default ReplayDateFormGroup;
