import { HeartFilledIcon } from "@radix-ui/react-icons";
import type { ProfileMenuProps } from "@repo/ui/theme/types";
import { Layers, LogOut, Settings, User } from "lucide-react";
import type { AbpUiNavigationResource } from "src/language-data/AbpUiNavigation";

export function getProfileMenuFromDB(languageData: AbpUiNavigationResource) {
  const profileMenu: ProfileMenuProps = {
    info: {
      name: "Neil Sims",
      email: "name@flowbite.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    menuTitle: languageData.Profile,
    menu: {
      account: [
        {
          icon: <User className="mr-2 h-5 w-5 text-gray-400" />,
          href: "#",
          name: languageData.Profile,
        },
        {
          href: "#",
          name: languageData.UserSettings,
          icon: <Settings className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      primary: [
        {
          href: "#",
          name: languageData.OurTeam,
          icon: <HeartFilledIcon className="mr-2 h-5 w-5 text-gray-400" />,
        },
        {
          href: "#",
          name: languageData.Management,
          icon: <Layers className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      secondary: [
        {
          href: "#",
          name: languageData.LogOut,
          icon: <LogOut className="mr-2 h-4 w-4" />,
        },
      ],
    },
  };

  return profileMenu;
}
