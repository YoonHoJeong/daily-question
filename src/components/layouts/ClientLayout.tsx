import styled from 'styled-components';
import sizes from '../../constants/sizes';

export const ClientLayout = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;

  margin-top: ${sizes.header.height};
  padding-bottom: ${sizes.bottomNavigation.height};
`;
