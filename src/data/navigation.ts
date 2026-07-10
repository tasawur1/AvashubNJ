export type NavChild = { label: string; href: string };
export type NavItem  = { label: string; href: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All Programs",  href: "/programs" },
      { label: "Kids",          href: "/programs/kids" },
      { label: "School Age",    href: "/programs/school-age" },
      { label: "Teens",         href: "/programs/teens" },
      { label: "Young Adults",  href: "/programs/young-adults" },
    ],
  },
  { label: "For Families", href: "/families" },
  { label: "Resources",    href: "/resources" },
  {
    label: "Cohorts",
    href: "/cohorts",
    children: [
      { label: "View All",             href: "/cohorts" },
      { label: "Adventure Cohorts",    href: "/cohorts/adventure" },
      { label: "Life Ready Cohorts",   href: "/cohorts/life-ready" },
    ],
  },
  { label: "Blogs",        href: "/blogs" },
  { label: "Contact",      href: "/contact" },
];
