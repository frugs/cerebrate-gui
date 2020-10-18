import React from "react";
import { ReplayTagTree } from "./ReplayTagTree";
import { ReplayFilterAndSort } from "./ReplayFilterAndSort";

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
    };
  }

  render() {
    return (
      <div>
        <ReplayFilterAndSort {...this.props} {...this.state} />
        <ReplayTagTree {...this.props} />
      </div>
    );
  }
}
