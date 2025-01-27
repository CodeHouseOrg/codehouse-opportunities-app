import React from 'react';
import { Textarea } from '@chakra-ui/react';

export function TextArea({ className = '', ...props }) {
	return (
		<Textarea
			className={`p-2 border min-h-[5rem] border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${className}`}
			{...props}
		/>
	);
}
