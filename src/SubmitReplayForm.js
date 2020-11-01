import React from "react";

import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

import SelectTagsInput from "./SelectTagsInput";
import ReplaySelector from "./ReplaySelector";
import SelectPlayerAndOpponentInput from "./SelectPlayerAndOpponentInput";
import ReplayDateFormGroup from "./ReplayDateFormGroup";

export function SubmitReplayForm(props) {
  const {
    notes,
    replaySelectedTags,
    submittingReplay,
    setNotes,
    updateReplayInfo,
    setReplaySelectedTags,
    ...other
  } = props;
  const {
    t,
    replayId,
    formDisabled,
    playerTeam,
    opponentTeam,
    failedToTagReplay,
    failedToLoadReplay,
  } = other;
  return (
    <div>
      <br />
      <FormGroup label={t("submitFormReplayIdLabel")}>
        <InputGroup disabled={true} fill={true} value={replayId} />
      </FormGroup>
      <FormGroup
        label={t("submitReplayFormReplayFileLabel")}
        intent={failedToLoadReplay ? Intent.DANGER : null}
        helperText={
          failedToLoadReplay
            ? t("submitReplayFormLoadReplayFailedHelperText")
            : null
        }
      >
        <ReplaySelector fill={true} {...other} />
      </FormGroup>
      <ReplayDateFormGroup {...other} />
      <SelectPlayerAndOpponentInput {...other} />
      <FormGroup label={t("submitReplayFormPlayerTagsLabel")}>
        <SelectTagsInput
          {...other}
          fill={true}
          selectedTags={replaySelectedTags}
          onTagsSelected={setReplaySelectedTags}
          disabled={formDisabled || playerTeam === null}
          tagPrefix={"player:"}
          tagIntent={Intent.SUCCESS}
        />
      </FormGroup>
      <FormGroup label={t("submitReplayFormOpponentTagsLabel")}>
        <SelectTagsInput
          {...other}
          fill={true}
          selectedTags={replaySelectedTags}
          onTagsSelected={setReplaySelectedTags}
          disabled={formDisabled || opponentTeam === null}
          tagPrefix={"opponent:"}
          tagIntent={Intent.DANGER}
        />
      </FormGroup>
      <FormGroup label={t("submitReplayGameTagsLabel")}>
        <SelectTagsInput
          {...other}
          fill={true}
          selectedTags={replaySelectedTags}
          onTagsSelected={setReplaySelectedTags}
          disabled={formDisabled}
          tagPrefix={"game:"}
          tagIntent={Intent.PRIMARY}
        />
      </FormGroup>
      <FormGroup label={t("submitReplayFormNotesLabel")}>
        <TextArea
          fill={true}
          disabled={formDisabled}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </FormGroup>
      <FormGroup
        intent={failedToTagReplay ? Intent.DANGER : null}
        helperText={
          failedToTagReplay
            ? t("submitReplayFormSubmitReplayFailedHelperText")
            : null
        }
      >
        <Button
          fill={true}
          loading={submittingReplay}
          intent={Intent.SUCCESS}
          disabled={
            formDisabled || playerTeam === null || opponentTeam === null
          }
          onClick={updateReplayInfo}
          icon={IconNames.TAG}
        >
          {t("submitReplayFormSubmitReplayButton")}
        </Button>
      </FormGroup>
    </div>
  );
}
