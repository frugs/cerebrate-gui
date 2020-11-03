import {
  Card,
  ControlGroup,
  FormGroup,
  H5,
  HTMLSelect,
  Icon,
  Switch,
} from "@blueprintjs/core";
import React from "react";
import { IconNames } from "@blueprintjs/icons";

function SortFormGroup(props) {
  const {
    t,
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
        innerLabel={t("sortAscending")}
        innerLabelChecked={t("sortDescending")}
        onChange={(event) => setSortDescending(event.currentTarget.checked)}
      />
    </FormGroup>
  );
}

export function SortOptions(props) {
  const { t, sortReplaysDescending, sortTagsDescending } = props;

  return (
    <Card className={"ReplayFilterAndSort-container"}>
      <H5 className={"ReplayFilterAndSort-control-group-heading"}>
        <Icon icon={IconNames.SORT} /> {t("findReplaysSortOptionsHeading")}
      </H5>
      <ControlGroup fill={true} vertical={false}>
        <SortFormGroup
          t={t}
          formGroupLabel={t("findReplaysSortReplaysLabel")}
          selectOptions={[
            { label: t("sortReplaysByDateOptionLabel"), value: "date" },
          ]}
          selectValue={"date"}
          sortDescending={sortReplaysDescending}
          setSortDescending={() => {}}
        />
        <SortFormGroup
          t={t}
          formGroupLabel={t("findReplaysSortTagsLabel")}
          selectOptions={[
            { label: t("sortTagsByFrequencyOptionLabel"), value: "frequency" },
          ]}
          selectValue={"frequency"}
          sortDescending={sortTagsDescending}
          setSortDescending={() => {}}
        />
      </ControlGroup>
    </Card>
  );
}
