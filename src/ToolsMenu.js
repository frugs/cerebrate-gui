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

export function ToolsMenu() {
  return (
    <Popover
      className={Classes.TAB}
      interactionKind={PopoverInteractionKind.HOVER}
      content={
        <Menu>
          <MenuItem
            icon={IconNames.INSERT}
            text={"Add multiple replays"}
            intent={Intent.PRIMARY}
            onClick={async () => {
              await Guy.insertMultipleReplays();
            }}
          />
          <MenuItem
            icon={IconNames.REFRESH}
            text={"Re-apply automatic replay tags"}
            onClick={async () => {
              await Guy.regenerateSavedReplayInfo();
            }}
          />
        </Menu>
      }
      position={Position.BOTTOM}
    >
      <div>
        Tools <Icon icon={IconNames.CHEVRON_DOWN} />
      </div>
    </Popover>
  );
}
