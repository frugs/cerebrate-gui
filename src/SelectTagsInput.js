import React from "react";
import { MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

import { TagUtils } from "./TagUtils";

function SelectTagsInput(props) {
  const {
    t,
    fill,
    disabled,
    tagIntent,
    suggestTags,
    selectedTags,
    onTagsSelected,
    tagPrefix,
    ...other
  } = props;

  return (
    <MultiSelect
      createNewItemRenderer={(query, active, handleClick) => {
        return (
          <MenuItem
            active={active}
            onClick={handleClick}
            text={query}
            key={query}
          />
        );
      }}
      itemRenderer={(item, { modifiers, handleClick }) => {
        if (!modifiers.matchesPredicate) {
          return null;
        }

        return (
          <MenuItem
            active={modifiers.active}
            onClick={handleClick}
            text={TagUtils.removePrefix(item)}
            key={item}
          />
        );
      }}
      itemPredicate={(query, item, index, exactMatch) =>
        item.indexOf(tagPrefix) === 0 &&
        !selectedTags.includes(item) &&
        item.includes(query.toLocaleLowerCase("en-GB"))
      }
      initialContent={null}
      items={suggestTags}
      selectedItems={selectedTags.filter((tag) => tag.indexOf(tagPrefix) === 0)}
      createNewItemFromQuery={(query) => tagPrefix + query}
      onItemSelect={(item) => {
        if (!selectedTags.includes(item)) {
          selectedTags.push(item);
          onTagsSelected(selectedTags);
        }
      }}
      resetOnSelect={true}
      tagRenderer={(item) => TagUtils.removePrefix(item)}
      tagInputProps={{
        disabled: disabled,
        onRemove: (valueAsString, index, value) => {
          selectedTags.splice(
            selectedTags.indexOf(tagPrefix + valueAsString),
            1
          );
          onTagsSelected(selectedTags);
        },
        tagProps: { intent: tagIntent },
      }}
      openOnKeyDown={true}
      fill={fill}
      placeholder={t("submitReplayFormTagsPlaceholderText")}
      {...other}
    />
  );
}

export default SelectTagsInput;
