import React from 'react';
import {
  HeaderWrapper,
  Logo,
} from './Header.styles';
import LogoImage from '../../static/assets/images/reddit_logo.svg';

const Header = () => (
  <HeaderWrapper>
    <Logo>
      <LogoImage />
    </Logo>
  </HeaderWrapper>
);

export default Header;
