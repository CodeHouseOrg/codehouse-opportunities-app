'use client';
import React from 'react';
import { Fieldset, Stack, Flex } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textArea';
import { TextInput } from '@/components/ui/textInput';
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	NativeSelectRoot,
	NativeSelectField,
} from '@/components/ui/native-select';

const partnerRegistrationSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	organization: z.string().min(1, 'Organization is required'),
	website: z.string().url('Invalid URL'),
	location: z.string().min(1, 'Location is required'),
	industry: z.string().min(1, 'Industry is required'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	agreement: z.boolean().refine((val) => val, 'You must agree to the terms'),
});

const PartnerRegistrationForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(partnerRegistrationSchema),
		defaultValues: {
			agreement: false,
		},
	});

	const onSubmit = (data) => {
		console.log('Form Data:', data);
	};

	return (
		<Flex
			bg='primaryWhite'
			minH='100vh'
			justify='center'
			align='center'
			direction='column'
			pt='96px'
			pb='250px'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full max-w-[40rem]'>
				<Fieldset.Root
					pos='inherit'
					py='2rem'
					w='100%'
					align='center'>
					<Stack className='p-8 '>
						<Fieldset.Legend>
							<h1 className='text-5xl font-bold text-black '>
								Partner Registration
							</h1>
						</Fieldset.Legend>
						<h2 className='mb-4 text-2xl font-bold text-black'>
							Submit your profile for our students from top programs to view and
							reach out.
						</h2>

						<Flex
							gap={28}
							w='100%'>
							<Field label='Point of Contact First Name*'>
								<TextInput
									placeholder='Jane'
									{...register('firstName')}
								/>
								{errors.firstName && (
									<p className='text-red-500'>{errors.firstName.message}</p>
								)}
							</Field>

							<Field label='Point of Contact Last Name*'>
								<TextInput
									placeholder='Doe'
									{...register('lastName')}
								/>
								{errors.lastName && (
									<p className='text-red-500'>{errors.lastName.message}</p>
								)}
							</Field>
						</Flex>

						<Field label='Point of Contact Email*'>
							<TextInput
								{...register('email')}
								placeholder='jane@doe.com'
							/>
							{errors.email && (
								<p className='text-red-500'>{errors.email.message}</p>
							)}
						</Field>

						<Field label='Organization*'>
							<TextInput
								{...register('organization')}
								placeholder='ABC Company'
							/>
							{errors.organization && (
								<p className='text-red-500'>{errors.organization.message}</p>
							)}
						</Field>

						<Field label='Organization Website*'>
							<TextInput
								{...register('website')}
								placeholder='abc.co'
							/>
							{errors.website && (
								<p className='text-red-500'>{errors.website.message}</p>
							)}
						</Field>

						<Field label='Organization Location*'>
							<TextInput
								{...register('location')}
								placeholder='New York, NY USA'
							/>
							{errors.location && (
								<p className='text-red-500'>{errors.location.message}</p>
							)}
						</Field>

						<Field label='Industry*'>
							<NativeSelectRoot>
								<NativeSelectField
									{...register('industry')}
									placeholder='Technology'
									items={[
										'Technology',
										'Healthcare',
										'Finance',
										'Education',
										'Other',
									]}
								/>
							</NativeSelectRoot>
							{errors.industry && (
								<p className='text-red-500'>{errors.industry.message}</p>
							)}
						</Field>

						<Field label='Organization Description*'>
							<TextArea
								{...register('description')}
								placeholder="We're dedicated to the ABC's."
							/>
							{errors.description && (
								<p className='text-red-500'>{errors.description.message}</p>
							)}
						</Field>

						<Stack
							direction='row'
							mt={2}>
							<Controller
								name='agreement'
								control={control}
								render={({ field }) => (
									<Checkbox
										variant='subtle'
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
										className='w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
									/>
								)}
							/>
							{errors.agreement && (
								<p className='text-red-500'>{errors.agreement.message}</p>
							)}
							<Stack
								ml={2}
								spacing={0}>
								<span className='text-black text-start'>
									I verify the responses above are correct.
								</span>
								<span className='text-sm text-gray-600 text-start'>
									By checking this box you certify the accuracy of your
									submission.
								</span>
							</Stack>
						</Stack>

						<Button
							type='submit'
							className='p-2 mt-4 text-white bg-black rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
							Submit
						</Button>
					</Stack>
				</Fieldset.Root>
			</form>
		</Flex>
	);
};

export default PartnerRegistrationForm;
