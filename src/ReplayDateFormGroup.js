import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";

function formatDate(timestamp) {
    let date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

export function ReplayDateFormGroup({ replayTimestamp }) {
  return (
    <FormGroup label="Replay date">
      <InputGroup disabled={true} fill={true} value={replayTimestamp && formatDate(replayTimestamp)} />
    </FormGroup>
  );
}
