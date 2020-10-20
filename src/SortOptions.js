import {
  Card,
  ControlGroup,
  FormGroup,
  H5,
  HTMLSelect,
  Switch,
} from "@blueprintjs/core";
import React from "react";

function SortFormGroup(props) {
  const {
    formGroupLabel,
    selectOptions,
    selectValue,
    sortDescending,
    setSortDescending,
  } = props;
  return (
    <FormGroup
      className={"ReplayFilterAndSort-sorting-form-group"}
      contentClassName={"ReplayFilterAndSort-sorting-form-group-content"}
      label={formGroupLabel}
    >
      <HTMLSelect
        fill={true}
        options={selectOptions}
        defaultValue={selectValue}
      />
      <Switch
        className={"ReplayFilterAndSort-sorting-descending-switch"}
        checked={sortDescending}
        innerLabel="Ascending"
        innerLabelChecked="Descending"
        onChange={(event) => setSortDescending(event.currentTarget.checked)}
      />
    </FormGroup>
  );
}

export function SortOptions(props) {
  const { sortReplaysDescending, sortTagsDescending } = props;

  return (
    <Card className={"ReplayFilterAndSort-container"}>
      <H5 className={"ReplayFilterAndSort-control-group-heading"}>Sorting</H5>
      <ControlGroup fill={true} vertical={false}>
        <SortFormGroup
          formGroupLabel={"Sort replays by"}
          selectOptions={[{ label: "Replay date", value: "date" }]}
          selectValue={"date"}
          sortDescending={sortReplaysDescending}
          setSortDescending={() => {}}
        />
        <SortFormGroup
          formGroupLabel={"Sort tags by"}
          selectOptions={[{ label: "Tag frequency", value: "frequency" }]}
          selectValue={"frequency"}
          sortDescending={sortTagsDescending}
          setSortDescending={() => {}}
        />
      </ControlGroup>
    </Card>
  );
}
