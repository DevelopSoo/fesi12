"use client"; // 빼먹지 말기

import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";

export default function Dropdown() {
  return (
    <Menu>
      <MenuButton className="data-active:bg-red-200">My account</MenuButton>
      <MenuItems anchor="right">
        <MenuSection>
          <MenuHeading className="text-sm opacity-50">Settings</MenuHeading>
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/profile">
              My profile
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/notifications">
              Notifications
            </a>
          </MenuItem>
        </MenuSection>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuSeparator className="my-1 h-px bg-black" />
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>

        <MenuItem disabled>
          <a
            className="block data-focus:bg-blue-100 data-[disabled]:opacity-50"
            href="/license"
          >
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
