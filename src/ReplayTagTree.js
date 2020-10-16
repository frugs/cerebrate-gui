import React from "react";
import { Classes, Icon, Tree } from "@blueprintjs/core";

import Guy from "./Guy";
import TagUtils from "./TagUtils";

import "./ReplayTagTree.scss";

export class ReplayTagTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    (async () => {
      this.setState({
        contents: await this.generateContents([]),
      });
    })();
  }

  async generateContents(filterTags) {
    const tagFrequencyTable = await Guy.fetchTagFrequencyTable(filterTags);

    return [
      {
        id: 0,
        icon: <Icon icon="folder-open" className={Classes.TREE_NODE_ICON} />,
        label: "Replays",
        childNodes: [
          {
            id: 0,
            label: (
              <span>
                <em>Loading...</em>
              </span>
            ),
            disabled: true,
          },
        ],
      },
    ].concat(
      tagFrequencyTable.map((tagInfo, index) => ({
        id: index + 1,
        filterTags: filterTags.concat(tagInfo.tag),
        icon: (
          <Icon
            icon="tag"
            intent={TagUtils.getTagIntent(tagInfo.tag)}
            className={Classes.TREE_NODE_ICON}
          />
        ),
        label: (
          <div>
            <span
              className={
                "ReplayTagTree-tree-node-label-" +
                TagUtils.extractPrefix(tagInfo.tag) +
                "-tag"
              }
            >
              <span className="ReplayTagTree-tree-node-label-tag-prefix">
                {TagUtils.extractPrefix(tagInfo.tag)}:&nbsp;
              </span>
              <span className="ReplayTagTree-tree-node-label-tag-name">
                <strong>{TagUtils.removePrefix(tagInfo.tag)}</strong>
              </span>
            </span>
          </div>
        ),
        secondaryLabel: (
          <span className={"ReplayTagTree-tree-node-label-tag-freq"}>
            <em>{"Replay(s): " + tagInfo.frequency} </em>
          </span>
        ),
        childNodes: [
          {
            id: 0,
            label: (
              <span>
                <em>Loading...</em>
              </span>
            ),
            disabled: true,
          },
        ],
      }))
    );
  }

  handleNodeCollapse = (nodeData) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = (nodeData) => {
    nodeData.isExpanded = true;
    this.setState(this.state);

    if (nodeData.label === "Replays") {
      // TODO: implement this
    } else {
      (async () => {
        nodeData.childNodes = await this.generateContents(nodeData.filterTags);
        this.setState(this.state);
      })();
    }
  };

  render() {
    return (
      <Tree
        {...this.props}
        contents={this.state.contents}
        onNodeExpand={this.handleNodeExpand}
        onNodeCollapse={this.handleNodeCollapse}
      />
    );
  }
}
