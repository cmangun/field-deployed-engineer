"use client";
import headerMenuData from "@/data/header-menu/menuData";
import ThemeLink from "@/components/ThemeLink";
import { MenuItem, Submenu } from "@/types/menu-d-t";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavMenus() {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(headerMenuData[0]?.id || null);

  // Renders nested submenus
  const renderSubmenu = (submenus: Submenu[] = []) => {
    return submenus.map((submenu, i) => {
      if (submenu.submenus) {
        return (
          <li key={i} className="menu-item-has-children">
            <Link href={submenu.link || "#"}>{submenu.title}</Link>
            <ul className="tp-submenu submenu">
              {renderSubmenu(submenu.submenus)}
            </ul>
          </li>
        );
      }

      return (
        <li key={i}>
          <Link href={submenu.link || "#"}>
            {submenu.title}
          </Link>
        </li>
      );
    });
  };

  // Returns CSS class based on tag like 'Popular', 'Trending', or 'Hot'
  const getTagClass = (tag: string) => {
    switch (tag) {
      case 'Popular': return 'pop';
      case 'Trending': return 'new';
      case 'Hot': return 'hot';
      default: return '';
    }
  };

  return (
    <ul>
      {headerMenuData.map((menu: MenuItem) => (
        <li
          key={menu.id}
          className={`has-dropdown ${menu.megaMenu || menu.smallMenu || menu.mediumMenu ? "p-static" : ""
            } ${hoveredMenu === menu.id ? 'active' : ''}`}

          onMouseEnter={() => setHoveredMenu(menu.id)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <Link href={menu.link}>
            {menu.title}
            {menu.pluseIncon && (
              <span className="dropdown-btn"></span>
            )}
          </Link>

          {menu.megaMenu || menu.smallMenu || menu.mediumMenu ? (
            <div className={`tp-megamenu-wrapper ${menu.smallMenu ? "megamenu-small" : ""} mega-menu megamenu-white-bg`}>
              <div className="row gx-0">

                {menu.megaMenu &&
                  menu?.submenus?.map((submenu: Submenu, i: number) => (
                    <div key={i} className="col-xl-3">
                      <div className="tp-megamenu-list">
                        {submenu.title && (
                          <h4 className="tp-megamenu-title">{submenu.title}</h4>
                        )}
                        {submenu.megaMenu && (
                          <ul>
                            {submenu.megaMenu.map((item, j) => (
                              <li key={j}>
                                <ThemeLink href={item.link}>
                                  {item.title}
                                  {item.tag && (
                                    <span className={getTagClass(item.tag)}>{item.tag}</span>
                                  )}
                                </ThemeLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}

                {menu.smallMenu &&
                  menu?.submenus?.map((submenu: Submenu, i: number) => (
                    <div key={i} className="col-xl-4">
                      <div className="tp-megamenu-list">
                        {submenu.title && (
                          <h4 className="tp-megamenu-title">{submenu.title}</h4>
                        )}
                        {submenu.megaMenu && (
                          <ul>
                            {submenu.megaMenu.map((item, j) => (
                              <li key={j}>
                                <ThemeLink href={item.link}>
                                  {item.title}
                                  {item.tag && (
                                    <span className={getTagClass(item.tag)}>{item.tag}</span>
                                  )}
                                </ThemeLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}

                {menu.mediumMenu && (
                  <div className="col-xl-10">
                    <div className="row gx-0">
                      {menu?.submenus?.map((submenu: Submenu, i: number) => (
                        <div key={i} className="col-xl-3">
                          <div className="tp-megamenu-list">
                            {submenu.title && (
                              <h4 className="tp-megamenu-title">{submenu.title}</h4>
                            )}

                            {submenu.megaMenu && (
                              <ul>
                                {submenu.megaMenu.map((item, j) => (
                                  <li key={j}>
                                    <ThemeLink href={item.link}>
                                      {item.title}
                                      {item.tag && (
                                        <span className={getTagClass(item.tag)}>{item.tag}</span>
                                      )}
                                    </ThemeLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* extra thumb render */}
                      {menu.menuThumb?.isThumb && (
                        <div className="col-xl-2">
                          <div className="tp-megamenu-list">
                            <div className="tp-megamenu-thumb">
                              <Image
                                src={menu.menuThumb.thumbSrc}
                                alt={menu.menuThumb.thumbAlt || ""}
                                width={300}
                                height={300}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

          ) : menu.submenus ? (
            <ul className="tp-submenu submenu">
              {renderSubmenu(menu.submenus)}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}