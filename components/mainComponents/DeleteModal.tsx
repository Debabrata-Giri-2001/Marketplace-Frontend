import React from 'react'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog'
import { Box } from '../ui/box'
import { Icon, TrashIcon } from '../ui/icon'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'
import { Button, ButtonText } from '../ui/button'
import { useRouter } from 'expo-router'
import { useMutation } from '@/hooks'
import { useToast } from '../ui/toast'
import { useChange } from '@/hooks/useAPI'
import { Alert, AlertText } from '../ui/alert'

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    url: string;
}

const DeleteModal = ({ isOpen, onClose, message, url }: DeleteModalProps) => {
    const { back } = useRouter();
    const { change, isChanging } = useChange();
    const toast = useToast()

    const handleDelete = async () => {
        try {
            const res = await change(url, {
                method: 'DELETE',
            });
            console.log("clich")
        } catch (error: any) {
            <Alert>
                <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
            </Alert>
        }
    };

    return (
        <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent className="w-full max-w-[415px] gap-4 items-center">
                <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
                    <Icon as={TrashIcon} size="lg" className="stroke-error-500" />
                </Box>
                <AlertDialogHeader className="mb-2">
                    <Heading size="md">Are you wan't to Delete ?</Heading>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm" className="text-center">{message}</Text>
                </AlertDialogBody>
                <AlertDialogFooter className="mt-5">
                    <Button
                        size="sm"
                        action="negative"
                        onPress={handleDelete}
                        className="px-[30px]">
                        <ButtonText>Delete</ButtonText>
                    </Button>
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={onClose}
                        size="sm"
                        className="px-[30px]"
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >

    )
}

export default DeleteModal
