import React from "react";
import { MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

class SelectTagsInput extends React.Component {
  constructor(props) {
    super(props);
    const { tagPrefix } = props;
    this.tagPrefix = tagPrefix;
  }

  removePrefix(tag) {
    if (tag.indexOf(this.tagPrefix) !== 0) {
      return tag;
    }

    return tag.slice(this.tagPrefix.length);
  }

  render() {
    const {
      tagIntent,
      tags,
      selectedTags,
      formDisabled,
      setSelectedTags,
    } = this.props;

    return (
      <MultiSelect
        createNewItemRenderer={(query, active, handleClick) => {
          return (
            <MenuItem active={active} onClick={handleClick} text={query} />
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
              text={this.removePrefix(item)}
            />
          );
        }}
        itemPredicate={(query, item, index, exactMatch) =>
          item.indexOf(this.tagPrefix) === 0 &&
          !selectedTags.includes(item) &&
          item.includes(query.toLocaleLowerCase("en-GB"))
        }
        initialContent={null}
        items={tags}
        selectedItems={selectedTags.filter(
          (tag) => tag.indexOf(this.tagPrefix) === 0
        )}
        createNewItemFromQuery={(query) => this.tagPrefix + query}
        onItemSelect={(item) => {
          if (!selectedTags.includes(item)) {
            selectedTags.push(item);
            setSelectedTags(selectedTags);
          }
        }}
        resetOnSelect={true}
        tagRenderer={(item) => this.removePrefix(item)}
        tagInputProps={{
          disabled: formDisabled,
          onRemove: (valueAsString, index, value) => {
            selectedTags.splice(
              selectedTags.indexOf(this.tagPrefix + valueAsString),
              1
            );
            setSelectedTags(selectedTags);
          },
          tagProps: { intent: tagIntent },
        }}
        openOnKeyDown={true}
        fill={true}
        placeholder={"Tags..."}
      />
    );
  }
}

export default SelectTagsInput;
