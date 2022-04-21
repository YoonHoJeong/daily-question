import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ArrowLeftIcon } from '../../assets/icons';
import sizes from '../../constants/sizes';
import { useInternalRouter } from '../../routes/useInternalRouter';
import { layoutConfigs } from './layoutConfig';
import { GlobalPortal } from './GlobalPortal';

interface Props {
  transparent?: boolean;
}

const Header: React.FC<Props> = ({ transparent = false }) => {
  const { goBack } = useInternalRouter();
  const { pathname } = useLocation();
  const { pathnames } = layoutConfigs;

  return (
    <GlobalPortal.Consumer>
      <Container transparent={transparent}>
        {!backDisabledRoutes.includes(pathname) && (
          <ButtonContainer
            style={{
              top: `calc((${sizes.header.height} - ${sizes.icon})/2)`,
            }}
            aria-label="back"
            onClick={() => {
              goBack();
            }}
          >
            <BackIcon src={ArrowLeftIcon} />
          </ButtonContainer>
        )}
        <HeaderTitle>{pathnames[pathname]}</HeaderTitle>
      </Container>
    </GlobalPortal.Consumer>
  );
};

const backDisabledRoutes = [
  '/',
  '/board',
  '/user',
  '/answers',
  '/answers/daily',
  '/answers/weekly',
  '/answers/monthly',
];

const Container = styled.header<Props>`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;

  width: 100%;
  height: ${sizes.header.height};

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.transparent ? 'transparent' : 'white')};
  border-bottom: ${sizes.borderSize} solid
    ${(props) => (props.transparent ? 'transparent' : props.theme.palette.grey200)};

  padding-top: calc(constant(safe-area-inset-top));
  padding-top: calc(env(safe-area-inset-top));

  box-sizing: border-box;
`;

interface ButtonProps {}
const ButtonContainer = styled.button<ButtonProps>`
  position: absolute;
  left: 1rem;
  background-color: transparent;
  border: none;
  height: ${sizes.icon};
`;
const BackIcon = styled.img``;

const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export default Header;
