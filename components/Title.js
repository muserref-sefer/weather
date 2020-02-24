import styled from 'styled-components';

const Title = styled.h2`
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.text};
`;

export default Title;