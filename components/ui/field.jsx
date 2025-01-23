import { Field as ChakraField } from '@chakra-ui/react';
import * as React from 'react';

export const Field = React.forwardRef(function Field(props, ref) {
	const { label, children, helperText, errorText, optionalText, ...rest } =
		props;
	// This change was made to have the text color of the label and inputs be black by default as well as sizing
	return (
		<ChakraField.Root
			ref={ref}
			{...rest}>
			{label && (
				<ChakraField.Label style={{ color: 'black', fontSize: '16px' }}>
					{label}
					<ChakraField.RequiredIndicator fallback={optionalText} />
				</ChakraField.Label>
			)}
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							...child.props,
							style: {
								...child.props.style,
								color: 'black',
								fontSize: '16px',
							},
					  })
					: child
			)}
			{helperText && (
				<ChakraField.HelperText style={{ fontSize: '16px' }}>
					{helperText}
				</ChakraField.HelperText>
			)}
			{errorText && (
				<ChakraField.ErrorText style={{ fontSize: '16px' }}>
					{errorText}
				</ChakraField.ErrorText>
			)}
		</ChakraField.Root>
	);
});
