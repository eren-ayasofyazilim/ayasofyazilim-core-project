import { useTheme } from "../../../../providers/theme";
import NavbarDropdown from "../navbar-dropdown";
import { DropdownMenuSeparator } from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";

function ProfileMenu() {
  const { profileMenu } = useTheme();

  if (!profileMenu) {
    return null;
  }
  return (
    <NavbarDropdown
      title={profileMenu.menuTitle}
      hideChevron={true}
      triggerContent={
        <img
          className="h-8 w-8 rounded-full"
          src={profileMenu?.info.image}
          alt="user photo"
        />
      }
      dropdownContent={
        <>
          <div className="px-4 py-3">
            <span className="block text-sm font-semibold text-gray-900">
              {profileMenu?.info.name}
            </span>
            <span className="block truncate text-sm text-gray-900">
              {profileMenu?.info.email}
            </span>
          </div>

          {profileMenu?.menu.account && (
            <>
              <DropdownMenuSeparator />
              <ul className="py-1 text-gray-700 " aria-labelledby="dropdown">
                {profileMenu?.menu.account.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {profileMenu?.menu.primary && (
            <>
              <DropdownMenuSeparator />
              <ul className="py-1 text-gray-700 " aria-labelledby="dropdown">
                {profileMenu?.menu.primary.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {profileMenu?.menu.secondary && (
            <>
              <DropdownMenuSeparator />
              <ul className="py-1 text-gray-700 " aria-labelledby="dropdown">
                {profileMenu?.menu.secondary.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      }
    />
  );
}

export default ProfileMenu;
