import React from "react";
import { ReplayTagTree } from "./ReplayTagTree";
import { ReplayFilterAndSort } from "./ReplayFilterAndSort";
import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import "./FindReplays.css";

export class FindReplays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterReplaysByDate: false,
      setFilterReplaysByDate: (filterReplaysByDate) => {
        this.setState({ filterReplaysByDate: filterReplaysByDate });
      },

      sortReplaysDescending: true,
      setSortReplaysDescending: (sortReplaysDescending) => {
        this.setState({
          sortReplaysDescending: sortReplaysDescending,
        });
      },

      sortTagsDescending: true,
      setSortTagsDescending: (sortReplaysDescending) => {
        this.setState({
          sortReplaysDescending: sortReplaysDescending,
        });
      },

      includeTags: [],
      setIncludeTags: (includeTags) => {
        this.setState({
          includeTags: includeTags,
        });
      },

      excludeTags: [],
      setExcludeTags: (excludeTags) => {
        this.setState({
          excludeTags: excludeTags,
        });
      },

      searchResults: null,
      setSearchResults: (searchResults) => {
        this.setState({
          searchResults: searchResults,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <div className={"FindReplays-filter-sort-container"}>
          <ReplayFilterAndSort {...this.props} {...this.state} />
          <Button
            fill={true}
            intent={Intent.PRIMARY}
            onClick={() => {
              this.state.setSearchResults(
                <ReplayTagTree {...this.props} {...this.state} />
              );
            }}
            icon={IconNames.SEARCH}
          >
            Find replays
          </Button>
        </div>
        {this.state.searchResults}
      </div>
    );
  }
}
