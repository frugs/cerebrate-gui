import {
  Classes,
  Icon,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { Guy } from "./Guy";

export function ToolsMenu(props) {
  const { t } = props;
  return (
    <Popover
      className={Classes.TAB}
      interactionKind={PopoverInteractionKind.HOVER}
      content={
        <Menu>
          <MenuItem
            icon={IconNames.INSERT}
            text={"Add multiple replays"}
            onClick={async () => {
              await Guy.insertMultipleReplays();
            }}
          />
          <MenuItem
            icon={IconNames.REFRESH}
            text={"Re-apply automatic tags to all replays"}
            onClick={async () => {
              await Guy.regenerateSavedReplayInfo();
            }}
          />
        </Menu>
      }
      position={Position.BOTTOM}
    >
      <div>
        {t("toolsMenuLabel")} <Icon icon={IconNames.CHEVRON_DOWN} />
      </div>
    </Popover>
  );
}
