import React from "react";

import "./ReplayFilterAndSort.scss";
import { SortOptions } from "./SortOptions";
import { TagsFilter } from "./TagsFilter";
import { ReplayDateFilter } from "./ReplayDateFilter";

export function ReplayFilterAndSort(props) {
  const {
    includeTags,
    setIncludeTags,
    excludeTags,
    setExcludeTags,
    ...other
  } = props;

  return (
    <div>
      <ReplayDateFilter {...other} />
      <SortOptions {...other} />
      <TagsFilter
        className={"ReplayFilterAndSort-container-include-tags"}
        title={"Include tags"}
        selectedTags={includeTags}
        onTagsSelected={setIncludeTags}
        {...other}
      />
      <TagsFilter
        className={"ReplayFilterAndSort-container-exclude-tags"}
        title={"Exclude tags"}
        selectedTags={excludeTags}
        onTagsSelected={setExcludeTags}
        {...other}
      />
    </div>
  );
}
