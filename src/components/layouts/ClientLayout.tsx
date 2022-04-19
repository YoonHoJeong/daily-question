import styled from 'styled-components';
import sizes from '../../constants/sizes';

export const ClientLayout = styled.div`
  max-width: 100%;
  width: 100%;

  height: auto;

  margin-top: ${sizes.header.height};
  padding-bottom: ${sizes.bottomNavigation.height};
`;
