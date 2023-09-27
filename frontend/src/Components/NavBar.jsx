import React from "react";
import { useSelector } from 'react-redux'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  // Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  // UserCircleIcon,
  // CodeBracketSquareIcon,
  // Square3Stack3DIcon,
  UserGroupIcon,
  ChevronDownIcon,
  // Cog6ToothIcon,
  // InboxArrowDownIcon,
  // LifebuoyIcon,
  PowerIcon,
  // RocketLaunchIcon,
  Bars2Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
 
// profile menu component
const profileMenuItems = [
  // {
  //   label: "My Profile",
  //   icon: UserCircleIcon,
  // },
  // {
  //   label: "Edit Profile",
  //   icon: Cog6ToothIcon,
  // },
  // {
  //   label: "Inbox",
  //   icon: InboxArrowDownIcon,
  // },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  // },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  
  const { userData : {firstname, lastname}} = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm" 
            alt="tania andrew"
            className="border border-orange-500 p-0.5"
            src="https://www.freeiconspng.com/uploads/profile-icon-9.png"
          />
          <span>{ firstname } { lastname }</span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`} 
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
// const navListMenuItems = [
//   {
//     title: "@material-tailwind/html",
//     description:
//       "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
//   },
//   {
//     title: "@material-tailwind/react",
//     description:
//       "Learn how to use @material-tailwind/react, packed with rich components for React.",
//   },
//   {
//     title: "Material Tailwind PRO",
//     description:
//       "A complete set of UI Elements for building faster websites in less time.",
//   },
// ];
 
// function NavListMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
//   const renderItems = navListMenuItems.map(({ title, description }) => (
//     <a href="#" key={title}>
//       <MenuItem>
//         <Typography variant="h6" color="blue-gray" className="mb-1">
//           {title}
//         </Typography>
//         <Typography variant="small" color="gray" className="font-normal">
//           {description}
//         </Typography>
//       </MenuItem>
//     </a>
//   ));
 
//   return (
//     <React.Fragment>
//       <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
//         <MenuHandler>
//           <Typography as="a" href="#" variant="small" className="font-normal">
//             <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
//               <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
//               <ChevronDownIcon
//                 strokeWidth={2}
//                 className={`h-3 w-3 transition-transform ${
//                   isMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </MenuItem>
//           </Typography>
//         </MenuHandler>
//         <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
//           <Card
//             color="blue"
//             // shadow={false}
//             variant="gradient"
//             className="col-span-3 grid h-full w-full place-items-center rounded-md"
//           >
//             <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
//           </Card>
//           <ul className="col-span-4 flex w-full flex-col gap-1">
//             {renderItems}
//           </ul>
//         </MenuList>
//       </Menu>
//       <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
//         <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
//       </MenuItem>
//       <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
//         {renderItems}
//       </ul>
//     </React.Fragment>
//   );
// }
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon : HomeIcon,
  },
  {
    label: "Turf",
    icon: CubeTransparentIcon,
  },
  {
    label: "About Us",
    icon: UserGroupIcon,
  },
  {
    label: "Reach Us",
    icon: ChatBubbleLeftRightIcon,
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex  flex-col gap-10 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium text-base"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] rounded border border-orange-500 w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <nav className="bg-white sticky z-50 top-0 ">
    <Navbar className="mx-auto shadow-none border-none   bg-white p-2 lg:rounded lg:pl-6">
      <div className="relative mx-auto flex items-center text-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-bold "
        >
          <span className="text-4xl font-serif"><span className="text-orange-600">T</span>urf <span className="text-orange-600">H</span>ouse</span>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
    </nav>
  );
}