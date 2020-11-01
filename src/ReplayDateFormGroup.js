import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { DateUtils } from "./DateUtils";

function ReplayDateFormGroup(props) {
  let { t, replayTimestamp } = props;
  return (
    <FormGroup label={t("submitReplayFormReplayDate")}>
      <InputGroup
        disabled={true}
        fill={true}
        value={replayTimestamp ? DateUtils.formatDate(replayTimestamp) : ""}
      />
    </FormGroup>
  );
}

export default ReplayDateFormGroup;
