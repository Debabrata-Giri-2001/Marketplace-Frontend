import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
    FormControl,
    FormControlErrorText,
    FormControlError,
    FormControlLabel,
    FormControlErrorIcon,
    FormControlLabelText
} from '../ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '../ui/input';
import AppIcon, { IconProps } from './AppIcon';
import { AlertCircleIcon } from '../ui/icon';
import { Text } from '../ui/text';

type InputProps = {
    rightElement?: React.ReactNode;
    secureTextEntry?: boolean;
    [key: string]: any;
};

type Props = {
    input: {
        key: string;
        label?: string;
        placeholder: string;
        icon: IconProps;
        rules: Object;
        inputProps?: InputProps;
    };
    errorMessage?: string;
    control: Control<any, any>;
    leftElement?: JSX.Element;
    rightElement?: JSX.Element;
    keyboardType?: 'default' | 'numeric';
};

export default function AppInput({
    input,
    errorMessage,
    control,
    leftElement,
    rightElement,
    keyboardType = 'default',
}: Props): JSX.Element {
    return (
        <Controller
            control={control}
            name={input.key}
            rules={input.rules}
            render={({ field: { onBlur, onChange, value } }) => (
                <FormControl className="w-full px-3 mb-4 my-1" isInvalid={Boolean(errorMessage)}>
                    {input.label && (
                        <FormControlLabel className="mb-2 text-sm font-medium text-gray-700">
                            <FormControlLabelText>
                                {input.label}
                            </FormControlLabelText>
                        </FormControlLabel>
                    )}

                    <Input className="relative flex items-center w-full border rounded-md h-auto">
                        {/* Left Element */}
                        {leftElement || (
                            <AppIcon style={{ marginLeft: 12 }} {...input.icon} color={'gray'} size={20} />
                        )}

                        {/* Input Field */}
                        <InputField
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType={keyboardType}
                            placeholder={input.placeholder}
                            className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                            {...input.inputProps}
                        />
                        {/* Right Element */}
                        {input.inputProps?.rightElement && (
                            input.inputProps.rightElement
                        )}
                    </Input>

                    {/* Error Message */}
                    {errorMessage && (
                        <FormControlError className="flex items-center mt-1">
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText className="ml-2 text-red-500">
                                {errorMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    )}
                </FormControl>
            )}
        />
    );
}
