import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EnterIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import logoDark from "@/assets/logo-dark.png";
import "./navbar.css";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import {
  GearIcon,
  PersonIcon,
  CalendarIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

function Icons({
  iconName,
  forceShow = false,
}: {
  iconName: string;
  forceShow?: boolean;
}) {
  const icon_size = "1.1em";
  const icons: { [key: string]: JSX.Element } = {
    home: (
      <HomeIcon width={icon_size} height={icon_size} color="white" />
      // <svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   width={icon_size}
      //   height={icon_size}
      //   viewBox="0 0 512 512"
      // >
      //   <path
      //     fill="none"
      //     stroke="white"
      //     strokeLinecap="round"
      //     strokeLinejoin="round"
      //     strokeWidth={32}
      //     d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"
      //   ></path>
      //   <path
      //     fill="none"
      //     stroke="white"
      //     strokeLinecap="round"
      //     strokeLinejoin="round"
      //     strokeWidth={32}
      //     d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
      //   ></path>
      // </svg>
    ),
    course: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={icon_size}
        height={icon_size}
        viewBox="0 0 2048 2048"
      >
        <path
          fill="white"
          d="M1760 1590q66 33 119 81t90 107t58 128t21 142h-128q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149h-128q0-73 20-142t58-128t91-107t119-81q-75-54-117-135t-43-175q0-79 30-149t82-122t122-83t150-30q79 0 149 30t122 82t83 123t30 149q0 94-42 175t-118 135m-224-54q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m-512 80q-32 37-58 77t-46 86q-53-55-128-85t-152-30H256V384H128v1408h787q-14 31-23 63t-15 65H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v640q-58-57-128-95V384h-128v369q-32-9-64-13t-64-4V256h-256q-70 0-136 24t-120 71zm-128-13V351q-54-46-120-70t-136-25H384v1280h256q67 0 132 17t124 50"
        ></path>
      </svg>
    ),
    myCalendar: (
      <CalendarIcon width={icon_size} height={icon_size} color="white" />
      // <svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   width={icon_size}
      //   height={icon_size}
      //   viewBox="0 0 24 24"
      // >
      //   <path
      //     fill="white"
      //     d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      //   ></path>
      //   <path
      //     fill="white"
      //     fillRule="evenodd"
      //     d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
      //     clipRule="evenodd"
      //   ></path>
      // </svg>
    ),
    profile: (
      // <svg
      //   width={icon_size}
      //   height={icon_size}
      //   viewBox="0 0 16 16"
      //   fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      // >
      //   <path
      //     d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.146 12.1123 0.438 11.637C0.73 11.1617 1.11733 10.7993 1.6 10.55C2.63333 10.0333 3.68333 9.64567 4.75 9.387C5.81667 9.12833 6.9 8.99933 8 9C9.1 9 10.1833 9.12933 11.25 9.388C12.3167 9.64667 13.3667 10.034 14.4 10.55C14.8833 10.8 15.271 11.1627 15.563 11.638C15.855 12.1133 16.0007 12.634 16 13.2V16H0Z"
      //     fill="white"
      //   />
      // </svg>
      <PersonIcon width={icon_size} height={icon_size} color="white" />
    ),
    setting: (
      <GearIcon width={icon_size} height={icon_size} color="white" />
      // <svg
      //   width={icon_size}
      //   height={icon_size}
      //   viewBox="0 0 16 16"
      //   fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      // >
      //   <path
      //     d="M14.6927 8.52793C14.5622 8.38196 14.4902 8.1943 14.4902 8C14.4902 7.8057 14.5622 7.61804 14.6927 7.47207L15.735 6.32023C15.8499 6.19438 15.9212 6.03603 15.9387 5.8679C15.9563 5.69976 15.9192 5.53049 15.8327 5.38436L14.2041 2.61673C14.1186 2.47077 13.9883 2.35507 13.8318 2.28613C13.6754 2.21718 13.5007 2.19852 13.3328 2.23278L11.802 2.53674C11.6072 2.57628 11.4044 2.54441 11.2319 2.44716C11.0594 2.3499 10.929 2.19398 10.8655 2.00882L10.3688 0.545014C10.3142 0.386139 10.2101 0.248146 10.0713 0.150541C9.93247 0.0529359 9.76594 0.000654948 9.59522 0.00108782H6.33804C6.16047 -0.00801657 5.98474 0.0402236 5.8377 0.13844C5.69067 0.236657 5.5804 0.379452 5.52374 0.545014L5.06773 2.00882C5.00422 2.19398 4.87391 2.3499 4.70139 2.44716C4.52888 2.54441 4.32609 2.57628 4.13129 2.53674L2.5597 2.23278C2.40055 2.21069 2.2383 2.23536 2.09339 2.30369C1.94849 2.37201 1.82741 2.48093 1.7454 2.61673L0.116812 5.38436C0.0281836 5.52886 -0.0116664 5.69718 0.00295878 5.86527C0.0175839 6.03336 0.0859354 6.1926 0.198241 6.32023L1.2324 7.47207C1.36295 7.61804 1.43494 7.8057 1.43494 8C1.43494 8.1943 1.36295 8.38196 1.2324 8.52793L0.198241 9.67977C0.0859354 9.8074 0.0175839 9.96664 0.00295878 10.1347C-0.0116664 10.3028 0.0281836 10.4711 0.116812 10.6156L1.7454 13.3833C1.83099 13.5292 1.96129 13.6449 2.11774 13.7139C2.2742 13.7828 2.44881 13.8015 2.6167 13.7672L4.14758 13.4633C4.34237 13.4237 4.54516 13.4556 4.71768 13.5528C4.8902 13.6501 5.02051 13.806 5.08402 13.9912L5.58074 15.455C5.6374 15.6205 5.74767 15.7633 5.89471 15.8616C6.04174 15.9598 6.21747 16.008 6.39504 15.9989H9.65222C9.82294 15.9993 9.98947 15.9471 10.1283 15.8495C10.2671 15.7519 10.3712 15.6139 10.4258 15.455L10.9225 13.9912C10.986 13.806 11.1164 13.6501 11.2889 13.5528C11.4614 13.4556 11.6642 13.4237 11.859 13.4633L13.3898 13.7672C13.5577 13.8015 13.7324 13.7828 13.8888 13.7139C14.0453 13.6449 14.1756 13.5292 14.2611 13.3833L15.8897 10.6156C15.9762 10.4695 16.0133 10.3002 15.9958 10.1321C15.9782 9.96397 15.9069 9.80562 15.792 9.67977L14.6927 8.52793ZM13.4794 9.59978L14.1309 10.3197L13.0886 12.0954L12.1277 11.9035C11.5412 11.7857 10.9311 11.8836 10.4133 12.1785C9.89539 12.4734 9.50577 12.9448 9.31836 13.5033L9.00893 14.3991H6.92433L6.63118 13.4873C6.44378 12.9288 6.05416 12.4574 5.53628 12.1625C5.01841 11.8676 4.40833 11.7697 3.82186 11.8875L2.86099 12.0794L1.80241 10.3117L2.45384 9.59178C2.85444 9.15183 3.07591 8.58227 3.07591 7.992C3.07591 7.40174 2.85444 6.83218 2.45384 6.39222L1.80241 5.67232L2.8447 3.91256L3.80557 4.10453C4.39205 4.22229 5.00213 4.12443 5.52 3.82953C6.03787 3.53462 6.42749 3.0632 6.6149 2.50475L6.92433 1.60087H9.00893L9.31836 2.51275C9.50577 3.0712 9.89539 3.54262 10.4133 3.83752C10.9311 4.13243 11.5412 4.23029 12.1277 4.11253L13.0886 3.92055L14.1309 5.69631L13.4794 6.41622C13.0833 6.85516 12.8646 7.42142 12.8646 8.008C12.8646 8.59457 13.0833 9.16083 13.4794 9.59978ZM7.96663 4.80044C7.32242 4.80044 6.69268 4.98809 6.15703 5.33966C5.62139 5.69123 5.20391 6.19094 4.95738 6.77558C4.71085 7.36022 4.64635 8.00355 4.77203 8.6242C4.89771 9.24486 5.20793 9.81497 5.66345 10.2624C6.11898 10.7099 6.69935 11.0146 7.33118 11.1381C7.96302 11.2615 8.61793 11.1982 9.2131 10.956C9.80827 10.7138 10.317 10.3037 10.6749 9.77758C11.0328 9.25142 11.2238 8.63281 11.2238 8C11.2238 7.15142 10.8806 6.3376 10.2698 5.73757C9.65897 5.13753 8.83049 4.80044 7.96663 4.80044ZM7.96663 9.59978C7.64453 9.59978 7.32965 9.50596 7.06183 9.33017C6.79401 9.15438 6.58527 8.90453 6.46201 8.61221C6.33874 8.31989 6.30649 7.99823 6.36933 7.6879C6.43217 7.37757 6.58728 7.09252 6.81504 6.86878C7.0428 6.64505 7.33299 6.49268 7.64891 6.43096C7.96482 6.36923 8.29228 6.40091 8.58987 6.52199C8.88745 6.64308 9.1418 6.84813 9.32076 7.11121C9.49971 7.37429 9.59522 7.68359 9.59522 8C9.59522 8.42429 9.42364 8.8312 9.11822 9.13122C8.8128 9.43123 8.39856 9.59978 7.96663 9.59978Z"
      //     fill="white"
      //   />
      // </svg>
    ),
    logout: (
      <svg
        className={"ml-[-3px]"}
        width={icon_size}
        height={icon_size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.9678 18.448C20.9581 18.7932 20.8791 19.1329 20.7356 19.4469C20.5921 19.7609 20.3869 20.0429 20.1322 20.2761C19.8776 20.5093 19.5787 20.689 19.2532 20.8044C18.9278 20.9198 18.5825 20.9687 18.2378 20.948C16.0848 20.96 13.9318 20.948 11.7788 20.948C11.6462 20.948 11.519 20.8953 11.4253 20.8016C11.3315 20.7078 11.2788 20.5806 11.2788 20.448C11.2788 20.3154 11.3315 20.1882 11.4253 20.0945C11.519 20.0007 11.6462 19.948 11.7788 19.948C13.9788 19.948 16.1788 19.98 18.3788 19.948C19.4858 19.932 19.9678 19.1 19.9678 18.11V5.64701C19.975 5.3324 19.8862 5.02305 19.7133 4.76011C19.5404 4.49718 19.2915 4.2931 18.9998 4.17501C18.6546 4.08031 18.2953 4.04813 17.9388 4.08001H11.7788C11.6462 4.08001 11.519 4.02734 11.4253 3.93357C11.3315 3.8398 11.2788 3.71262 11.2788 3.58001C11.2788 3.44741 11.3315 3.32023 11.4253 3.22646C11.519 3.13269 11.6462 3.08001 11.7788 3.08001C14.0028 3.08001 16.2438 2.99501 18.4658 3.08001C18.8061 3.08862 19.1412 3.16481 19.4518 3.30416C19.7623 3.4435 20.0421 3.64322 20.2747 3.89168C20.5074 4.14015 20.6883 4.4324 20.8069 4.75144C20.9256 5.07047 20.9796 5.40991 20.9658 5.75001L20.9678 18.448Z"
          fill="white"
        />
        <path
          d="M3.17617 11.663C3.09212 11.7452 3.04274 11.8565 3.03817 11.974C3.03951 11.988 3.03751 12.0024 3.03217 12.017C3.02417 12.039 3.03217 12.044 3.03817 12.058C3.04248 12.1759 3.09188 12.2875 3.17617 12.37L6.84517 16.039C6.93948 16.1301 7.06578 16.1805 7.19688 16.1794C7.32797 16.1782 7.45338 16.1256 7.54608 16.0329C7.63879 15.9402 7.69137 15.8148 7.69251 15.6837C7.69365 15.5526 7.64325 15.4263 7.55217 15.332L4.73717 12.516H15.4792C15.6118 12.516 15.739 12.4633 15.8327 12.3696C15.9265 12.2758 15.9792 12.1486 15.9792 12.016C15.9792 11.8834 15.9265 11.7562 15.8327 11.6625C15.739 11.5687 15.6118 11.516 15.4792 11.516H4.73717L7.55217 8.70002C7.64325 8.60572 7.69365 8.47941 7.69251 8.34832C7.69137 8.21722 7.63879 8.09181 7.54608 7.99911C7.45338 7.9064 7.32797 7.85382 7.19688 7.85268C7.06578 7.85154 6.93948 7.90194 6.84517 7.99302L3.17617 11.663Z"
          fill="white"
        />
      </svg>
    ),
  };
  return (
    <div className={`lg:${forceShow ? "mr-0" : "mr-4"} ml-0 w-fit`}>
      {icons[iconName]}
    </div>
  );
}

function MenuItem({
  title,
  path,
  iconName,
  currentPath,
  forceShow = false,
  setShowMenu,
}: {
  title: string;
  path: string;
  iconName: string;
  currentPath: string;
  forceShow?: boolean;
  setShowMenu?: any;
}) {
  return (
    <NavigationMenuItem
      className={`lg:self-start flex w-[92%] justify-center items-center mb-2 lg:${forceShow ? "pr-0" : "pr-3"}`}
    >
      <Link
        onClick={() => {
          if (forceShow) setShowMenu(false);
        }}
        to={path}
        className={`${forceShow ? "justify-start" : "justify-center lg:justify-start"} items-center overflow-hidden flex h-10 w-full px-4 font-light rounded-lg transition duration-200 ease-in-out ${currentPath.startsWith(path) ? "text-secondary-foreground bg-secondary hover:bg-secondary" : "text-secondary bg-primary menuItemInvert hover:bg-muted"}`}
      >
        <Icons iconName={iconName} forceShow={forceShow} />
        <div
          className={`${forceShow ? "block ml-2" : "hidden"} lg:block ml-2 overflow-hidden max-h-6 font-[500] whitespace-nowrap`}
        >
          {title}
        </div>
      </Link>
    </NavigationMenuItem>
  );
}

function NavBar() {
  const { t, i18n } = useTranslation();
  const [loggedIn] = useState(!!localStorage.getItem("token"));
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const isInFrame = window.location !== window.parent.location;

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  function logout() {
    localStorage.removeItem("token");
    navigate(0);
  }

  return (
    <>
      {/* top */}
      <div
        className={`sticky top-0 w-screen h-14 shadow flex items-center md:${isInFrame ? "flex" : "hidden"} z-30 bg-primary justify-between`}
      >
        <HamburgerMenuIcon
          onClick={() => setShowMenu(!showMenu)}
          width="1.3rem"
          height="1.3rem"
          className="mx-4 hover:cursor-pointer"
        />
        <Link to="/home">
          <img
            src={logoDark}
            alt="logo"
            className="h-8 w-8 rounded-full mx-4"
          />
        </Link>
      </div>

      {/* top-menu */}
      <div
        className={`md:${isInFrame ? "flex" : "hidden"} h-full flex flex-col absolute top-0 w-[170px] shadow z-[100] bg-primary transition-[left] ${
          showMenu ? "left-0" : "left-[-170px]"
        }`}
      >
        <Link to="/home">
          <img
            src={logoDark}
            alt="logo"
            className="mx-5 mt-4 h-10 w-10 rounded-full"
          />
        </Link>
        <NavigationMenu className="bg-primary flex flex-col w-full min-w-full items-start h-fit justify-start px-3 mt-8">
          <ScrollArea className="w-full">
            <NavigationMenuList className="flex flex-col my-0 mx-0 min-w-full w-full space-x-0 items-start">
              <MenuItem
                title={t("navbar.home")}
                path="/home"
                iconName="home"
                currentPath={currentPath}
                forceShow={true}
                setShowMenu={setShowMenu}
              />
              <MenuItem
                title={t("navbar.courses")}
                path="/courses"
                iconName="course"
                currentPath={currentPath}
                forceShow={true}
                setShowMenu={setShowMenu}
              />
              <MenuItem
                title={t("navbar.my-calendar")}
                path="/calendar"
                iconName="myCalendar"
                currentPath={currentPath}
                forceShow={true}
                setShowMenu={setShowMenu}
              />
              <MenuItem
                title={t("navbar.profile")}
                path="/profile"
                iconName="profile"
                currentPath={currentPath}
                forceShow={true}
                setShowMenu={setShowMenu}
              />
              <MenuItem
                title={t("navbar.settings")}
                path="/setting"
                iconName="setting"
                currentPath={currentPath}
                forceShow={true}
                setShowMenu={setShowMenu}
              />
            </NavigationMenuList>
          </ScrollArea>
        </NavigationMenu>
      </div>

      {/* top-mask */}
      <div
        onClick={() => setShowMenu(false)}
        className={`md:${isInFrame ? "" : "hidden"} h-full flex flex-col absolute top-0 w-screen transition-all shadow z-[99] bg-muted opacity-80 ${
          showMenu ? "" : "hidden"
        }`}
      ></div>

      {/* default */}
      <div
        className={`hidden md:${isInFrame ? "hidden" : "flex"} justify-end lg:max-w-48 lg:min-w-44 min-w-20 w-20 max-w-20 bg-primary relative px-0 transition-[width,margin,padding,transform,min-width] overflow-hidden border-r-[1px] flex-grow`}
      >
        <div
          className={`w-full flex-col flex justify-between h-full items-center lg:items-start`}
        >
          <div className="my-6 bg-primary flex flex-start justify-center lg:items-start lg:justify-start">
            <Link to="/home">
              <img
                src={logoDark}
                alt="logo"
                className="lg:ml-6 h-11 w-11 rounded-full bg-primary"
              />
            </Link>
          </div>
          <NavigationMenu className="bg-primary flex flex-col w-full min-w-full lg:items-start items-center h-fit lg:ml-1 justify-start m-0 overflow-x-hidden">
            <ScrollArea className="w-full self-start h-fit px-3">
              <NavigationMenuList className="flex flex-col my-2 mx-0 lg:min-w-full lg:w-full  space-x-0">
                <MenuItem
                  title={t("navbar.home")}
                  path="/home"
                  iconName="home"
                  currentPath={currentPath}
                />
                <MenuItem
                  title={t("navbar.courses")}
                  path="/courses"
                  iconName="course"
                  currentPath={currentPath}
                />
                <MenuItem
                  title={t("navbar.my-calendar")}
                  path="/calendar"
                  iconName="myCalendar"
                  currentPath={currentPath}
                />
                <MenuItem
                  title={t("navbar.profile")}
                  path="/profile"
                  iconName="profile"
                  currentPath={currentPath}
                />
                <MenuItem
                  title={t("navbar.settings")}
                  path="/setting"
                  iconName="setting"
                  currentPath={currentPath}
                />
              </NavigationMenuList>
            </ScrollArea>
          </NavigationMenu>

          <div className="w-full flex flex-col items-center lg:items-start overflow-hidden self-end">
            <div
              className={`my-4 w-full flex ${loggedIn ? "justify-start" : "justify-center"}`}
            >
              {/* 退出登录 */}
              {loggedIn ? (
                <Button
                  onClick={logout}
                  className="bg-primary self-center text-secondary px-3 hover:bg-secondary menuLogout mx-5 hover:text-secondary-foreground transition duration-200 ease-in-out"
                >
                  <Icons iconName="logout" />
                  <span className="hidden lg:block ml-2">
                    {t("navbar.logout")}
                  </span>
                </Button>
              ) : (
                <Link
                  className="w-full px-4"
                  to={`https://login.tripleuni.com/CUCampus?callback=${encodeURIComponent(location.pathname)}&language=${i18n.language}`}
                >
                  <Button className="bg-accent self-center text-accent-foreground px-3 hover:text-secondary hover:bg-accentlight menuItem w-full transition duration-200 ease-in-out">
                    <EnterIcon className="w-4 h-4 lg:mr-3" />
                    <span className="hidden lg:block">
                      {t("navbar.login-register")}
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
