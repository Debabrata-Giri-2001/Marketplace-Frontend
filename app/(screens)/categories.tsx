import PrivateContainer from '@/components/mainComponents/PrivateContainer'
import { Text } from '@/components/ui/text'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'

const categories = () => {
    const categoriesType = useLocalSearchParams();

    return (
        <PrivateContainer title='Categories'>

        </PrivateContainer>
    )
}

export default categories
