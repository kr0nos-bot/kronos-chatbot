import React, { useContext, createContext } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { isEqual } from 'lodash'

const exampleContext = createContext({
    data: undefined as any | undefined,
    isValidating: false
})

export function ProvideData({ children, arg }: any) {
    const data = useProvideExample(arg)
    return (
        <exampleContext.Provider value={data}>
            {children}
        </exampleContext.Provider>
    )
}

export function useExamples() {
    return useContext(exampleContext)
}

function useProvideExample(arg: any) {
    const url = `SOME_URL`
    const getData = async () => {
        let data
        try {
            data = await axios.get(url)
        } catch (error) {
            console.log(error)
        }

        return data
    }

    const { data, isValidating } = useSWR(url, getData, {
        refreshInterval: 1000,
        compare: (a, b) => isEqual(a, b) // Deep comparison function from lodash.isequal
    })

    return {
        data: data,
        isValidating
    }
}
