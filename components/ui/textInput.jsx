import React from 'react';
import { Input } from '@chakra-ui/react';

export function TextInput({ className = '', ...props }) {
	return (
		<Input
			className={`p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
			{...props}
		/>
	);
}
