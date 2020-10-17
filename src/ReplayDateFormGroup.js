import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import DateUtils from "./DateUtils";

export function ReplayDateFormGroup({ replayTimestamp }) {
  return (
    <FormGroup label="Replay date">
      <InputGroup
        disabled={true}
        fill={true}
        value={replayTimestamp && DateUtils.formatDate(replayTimestamp)}
      />
    </FormGroup>
  );
}
