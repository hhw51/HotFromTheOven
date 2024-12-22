import React from 'react';

const NavMenu: React.FC = () => {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Products', link: '/products' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.link} className="text-gray-800 hover:text-orange-500 transition">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
