import styled from 'styled-components';

interface IContainerInput {
	isFocus: boolean;
	edge: string | null;
	isError: boolean;
	isFull: boolean;
}

interface IHelperText {
	color?: string;
	weight?: string;
	size?: string;
}

const styles = (): string => `
    padding: 12px;
    display: inline-block;
    border: 1px solid #EDECEC;
    border-radius: 3px;
    box-sizing: border-box;
    outline: none;
    transition: border .1s ease-in-out;
    font-size: 14px;
    color: gray;
    background-color: white;

    &:focus {
        border: 1px solid #5C4D9C;
    }
    
    &:disabled{
        color:#AAAAAA;
    }
    
    &.error {
        border-color: #E80B0B;
    }
`;

export const TextField = styled.input`
	${styles()}
`;

export const TextTareaField = styled.textarea`
	${styles()}
`;

export const ContainerTextField = styled.div`
	span {
		margin-bottom: 5px;
		display: block;
		font-size: 14px;
		font-weight: bold;
		color: ${props => props.theme.label};
	}
`;

export const Input = styled.input`
	${styles()}
	border: none;

	&:focus {
		border: none;
	}
`;

export const Textarea = styled.textarea`
	${styles()}
	border: none;

	&:focus {
		border: none;
	}
`;

export const ContainerInput = styled.div<IContainerInput>`
	${styles()}
	
    overflow: hidden;
	padding: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: ${({ isFull }) => (isFull ? '100%' : '25ch')};
	${({ edge }: IContainerInput) =>
		edge !== null && (edge === 'start' ? 'padding-left: 12px' : 'padding-right: 12px')};

	border: 2px solid
		${({ isFocus, isError }) =>
			isFocus
				? isError
					? '#D32F2F'
					: 'gray'
				: isError
				? '#D32F2F'
				: '#C4C4C4'};

	svg {
		cursor: pointer;
	}

	input {
		width: 100%;
		color: ${({ isError }: IContainerInput) =>
			isError ? '#D32F2F' : 'gray'};
	}
`;

export const HelperText = styled.p<IHelperText>`
	color: ${props => props.color ?? 'gray'};
	font-weight: ${props => props.weight ?? 'normal'};
	font-size: ${props => props.size ?? '14px'};
	margin: 0;
`;