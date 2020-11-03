import React from "react";

import "./ReplayFilterAndSort.scss";
import { SortOptions } from "./SortOptions";
import { TagsFilter } from "./TagsFilter";
import { ReplayDateFilter } from "./ReplayDateFilter";
import { H5, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export function ReplayFilterAndSort(props) {
  const {
    includeTags,
    setIncludeTags,
    excludeTags,
    setExcludeTags,
    ...other
  } = props;

  const { t } = other;

  return (
    <div>
      <ReplayDateFilter {...other} />
      <SortOptions {...other} />
      <TagsFilter
        className={"ReplayFilterAndSort-container-include-tags"}
        title={
          <H5 className={"ReplayFilterAndSort-control-group-heading"}>
            <Icon icon={IconNames.FILTER_KEEP} />{" "}
            {t("findReplaysTagFilterIncludeTagsHeading")}
          </H5>
        }
        selectedTags={includeTags}
        onTagsSelected={setIncludeTags}
        {...other}
      />
      <TagsFilter
        className={"ReplayFilterAndSort-container-exclude-tags"}
        title={
          <H5 className={"ReplayFilterAndSort-control-group-heading"}>
            <Icon icon={IconNames.FILTER_REMOVE} />{" "}
            {t("findReplaysTagFilterExcludeTagsHeading")}
          </H5>
        }
        selectedTags={excludeTags}
        onTagsSelected={setExcludeTags}
        {...other}
      />
    </div>
  );
}
