// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { navigationItems } from "@/config/navigationconfig";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { Menu } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <header className="relative top-0 z-50 w-full ">
//       <div className="container flex h-16 max-w-screen-2xl items-center">
//         {/* Logo */}
// {/* Logo */}
// <Link href="/" className="mr-1 flex items-center space-x-4">
//   <img
//     src="/ADres.png"
//     alt="ADRES Logo"
//     className="h-12 md:h-14 w-auto object-contain"

//   />
// </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex ">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {navigationItems.map((item) => (
//                 <NavigationMenuItem key={item.href}>
//                   {item.children ? (
//                     <>
//                       <NavigationMenuTrigger className="h-9 px-4 py-2">
//                         {item.title}
//                       </NavigationMenuTrigger>
//                       <NavigationMenuContent>
//                         <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                           {/* Parent link */}
//                           <NavigationMenuLink asChild>
//                             <Link
//                               href={item.href}
//                               className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                             >
//                               <item.icon className="h-6 w-6" />
//                               <div className="mb-2 mt-4 text-lg font-medium">
//                                 {item.title}
//                               </div>
//                               <p className="text-sm leading-tight text-muted-foreground">
//                                 {item.description}
//                               </p>
//                             </Link>
//                           </NavigationMenuLink>

//                           {/* Child links */}
//                         {item.children.map((child) => (
//   <NavigationMenuLink key={child.href} asChild>
//     <Link
//       href={child.href}
//       className="block select-none rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
//     >
//       <div className="mb-2 mt-2 text-base font-semibold">
//         {child.title}
//       </div>

//       {child.description && (
//         <p className="text-sm leading-tight text-muted-foreground">
//           {child.description}
//         </p>
//       )}
//     </Link>
//   </NavigationMenuLink>
// ))}

//                         </div>
//                       </NavigationMenuContent>
//                     </>
//                   ) : (
//                     <NavigationMenuLink asChild>
//                       <Link
//                         href={item.href}
//                         className={cn(
//                           "group inline-flex h-9 w-max items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                           pathname === item.href && "bg-accent/50"
//                         )}
//                       >
//                         {item.title}
//                       </Link>
//                     </NavigationMenuLink>
//                   )}
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>

//         {/* Mobile Menu Button */}
//         <Button
//           variant="ghost"
//           className="ml-auto md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>

//         {/* Right Side */}
//         <div className="hidden md:flex ml-4 items-center space-x-2">
//           <Button size="sm" asChild>
//             <Link href="/login">Login</Link>
//           </Button>
//         </div>
//          <div className="hidden md:flex ml-auto items-center space-x-6">
//             {/* <img
//               src="https://cdn.builder.io/api/v1/image/assets%2Ff2b817a1b753483288430351a39e0889%2Fc3bce094d89f4584bd41a2a355d61ed9?format=webp&width=800"
//               alt="IIT Roorkee Logo"
//               className="h-10 w-10 object-contain"
//             /> */}
//            <img
//     src="https://cdn.builder.io/api/v1/image/assets%2Ff2b817a1b753483288430351a39e0889%2F1678695d18d5403194256e377cc4dfd5?format=webp&width=800"
//     alt="DST Logo"
//     className="h-12 md:h-14 w-auto object-contain"

//   />
            
//           </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] w-full overflow-auto p-6 md:hidden bg-background shadow-md">
//           <div className="grid gap-6 rounded-md p-4">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/config/navigationconfig";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
  children?: NavItem[];
};

function NestedMenu({ items }: { items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((child) => (
        <div key={child.href} className="mb-1">
          <Link
            href={child.href}
            className="block rounded-md px-2 py-1 text-sm font-semibold hover:bg-[var(--year)]"
            style={{ color: "var(--headline)" }}
          >
            {child.title}
          </Link>

          {child.children && (
            <div className="ml-3 mt-1 border-l border-[var(--border)] pl-3">
              <div className="flex flex-col gap-0.5">
                <NestedMenu items={child.children} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


function MobileNestedMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (t: string) => setOpen((p) => ({ ...p, [t]: !p[t] }));

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.href} className="pb-1">
          <div className="flex justify-between items-center">
            <Link
              href={item.href}
              className="text-base font-medium"
              style={{ color: "var(--headline)" }}
            >
              {item.title}
            </Link>

            {item.children && (
              <button
                onClick={() => toggle(item.title)}
                className="text-xs"
                style={{ color: "var(--muted)" }}
              >
                {open[item.title] ? "–" : "+"}
              </button>
            )}
          </div>

          {item.children && open[item.title] && (
            <div className="ml-3 mt-1 border-l border-[var(--border)] pl-3">
              <MobileNestedMenu items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
useEffect(() => {
  if (isMenuOpen) {
    document.body.classList.add("scroll-lock");
  } else {
    document.body.classList.remove("scroll-lock");
  }
}, [isMenuOpen]);

  return (
    <header className="theme-lightdark site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="logo">
          <img src="/ADres.png" alt="ADRES Logo" />
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger
                        style={{ color: "var(--headline)" }}
                      >
                        {item.title}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                       <div className="grid w-[420px] gap-3 p-3 grid-cols-1">

                          <NavigationMenuLink asChild>
                            <Link href={item.href}>
                              <div>
                                <h3 style={{ color: "var(--headline)" }}>
                                  {item.title}
                                </h3>
                                <p
                                  className="text-sm"
                                  style={{ color: "var(--subtext)" }}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                          <NestedMenu items={item.children} />
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={pathname === item.href ? "active" : ""}
                        style={{ color: "var(--headline)" }}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right actions */}
        <div className="header-actions">
          <Button size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ff2b817a1b753483288430351a39e0889%2F1678695d18d5403194256e377cc4dfd5?format=webp&width=800"
            alt="DST Logo"
            style={{ height: "44px", objectFit: "contain" }}
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="nav-mobile-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: "var(--headline)" }}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="mobile-menu-panel md:hidden">
          <MobileNestedMenu items={navigationItems} />
        </div>
      )}
    </header>
  );
}
