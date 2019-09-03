import React from 'react';
import SidebarMenu from './SidebarMenu';
import { SidebarWrapper } from './Sidebar.styles';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarMenu />
    </SidebarWrapper>
  );
};

export default Sidebar;
