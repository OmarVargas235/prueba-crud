import styled from 'styled-components';

interface IText {
	color?: string;
	size?: string;
	weight?: string;
	isUppercase?: boolean;
}

export const Text = styled.p<IText>`
	color: ${props => props.color ?? 'rgb(28, 30, 51)'};
	font-size: ${props => props.size ?? '16px'};
	font-weight: ${props => props.weight ?? 'normal'};
	margin: 0;
	text-transform: ${props => props.isUppercase === true ? 'uppercase' : 'none'};
`;