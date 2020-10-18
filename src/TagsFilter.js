import { Card, ControlGroup, FormGroup, H5, Intent } from "@blueprintjs/core";
import SelectTagsInput from "./SelectTagsInput";
import React from "react";

export function TagsFilter(props) {
  const { className, selectedTags, onTagsSelected, title, ...other } = props;

  return (
    <Card className={`ReplayFilterAndSort-container ${className}`}>
      <H5 className={"ReplayFilterAndSort-control-group-heading"}>{title}</H5>
      <ControlGroup fill={true} vertical={false}>
        <FormGroup
          label="Player tags"
          className={"ReplayFilterAndSort-select-tags-form-group"}
        >
          <SelectTagsInput
            selectedTags={selectedTags}
            onTagsSelected={onTagsSelected}
            tagPrefix={"player:"}
            tagIntent={Intent.SUCCESS}
            fill={true}
            {...other}
          />
        </FormGroup>
        <FormGroup
          label="Opponent tags"
          className={"ReplayFilterAndSort-select-tags-form-group"}
        >
          <SelectTagsInput
            selectedTags={selectedTags}
            onTagsSelected={onTagsSelected}
            tagPrefix={"opponent:"}
            tagIntent={Intent.DANGER}
            fill={true}
            {...other}
          />
        </FormGroup>
        <FormGroup
          label="Game tags"
          className={"ReplayFilterAndSort-select-tags-form-group"}
        >
          <SelectTagsInput
            selectedTags={selectedTags}
            onTagsSelected={onTagsSelected}
            tagPrefix={"game:"}
            tagIntent={Intent.PRIMARY}
            fill={true}
            {...other}
          />
        </FormGroup>
      </ControlGroup>
    </Card>
  );
}
