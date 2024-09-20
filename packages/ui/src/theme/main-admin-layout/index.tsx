"use client";

import { ThemeProvider } from "../../providers/theme";

function MainAdminLayout(props: any) {
  return (
    <ThemeProvider
      appName={props.appName}
      logo={props.logo}
      baseURL={props.baseURL}
      navbarItems={props.navbarItems}
      profileMenu={props.profileMenu}
      prefix={props.prefix}
      lang={props.lang}
    >
      <div>content</div>
    </ThemeProvider>
  );
}

export default MainAdminLayout;
