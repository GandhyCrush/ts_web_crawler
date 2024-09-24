import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import { useQuery } from '@tanstack/react-query'
import { get } from '../services/api'
import { Entry, EntryResponse } from '../models/InterfaceModels'

const Entries = () => {
    const [count, setCount] = useState(0)
    const [queryActive, setQueryActive] = useState(false)
    const [fetchedEntries, setFetchedEntries] = useState<Entry[]>([] as Entry[])

    const { isFetching, data, isSuccess, isFetched } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await get<EntryResponse>('/get_entries')

            console.log(response.data)
            setQueryActive(false)
            return response.data.result
        },
        enabled: queryActive,
    })

    const handleFilterMoreThanFive = () => {
        const filteredEntries = data?.filter(entry => {
            const cleanTitle = entry.title.replace(/[^a-zA-Z\s]/g, '');
            console.log(cleanTitle.split(/\s+/).length)
            return cleanTitle.split(/\s+/).length > 5;
        });

        const orderedEntries = filteredEntries?.sort((a, b) => b.number_of_comments - a.number_of_comments);

        setFetchedEntries(orderedEntries as Entry[]);
    }


    const handleFilterLessThanFive = () => {
        const filteredEntries = data?.filter(entry => {
            const cleanTitle = entry.title.replace(/[^a-zA-Z\s]/g, '');
            console.log(cleanTitle.split(/\s+/).length)
            return cleanTitle.split(/\s+/).length <= 5;
        });

        const orderedEntries = filteredEntries?.sort((a, b) => b.points - a.points)

        setFetchedEntries(orderedEntries as Entry[])
    }

    const handleGetEntries = () => {
        setQueryActive(true)
    }

    useEffect(() => {
        console.log(data)
        setFetchedEntries(data as Entry[])
    }, [isSuccess, isFetched])

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Web Crawler</h1>
            <div className='card' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                gap: '1rem',
                padding: '1rem',
                marginBottom: '1rem',
                width: '100%',
            }}>
                <button onClick={handleGetEntries} style={{
                    backgroundColor: 'darkblue',
                }}>
                    See results / Update Results
                </button>
                <button onClick={handleFilterMoreThanFive}>
                    Get titles with more than 5 words
                </button>
                <button onClick={handleFilterLessThanFive}>
                    Get titles with less than or equal to 5 words
                </button>
            </div>
            <div>
                {
                    isFetching ? (
                        <div className='card'>
                            <h2>Fetching the results...</h2>
                        </div>
                    ) : null
                }
                {
                    !fetchedEntries && isFetched ? (
                        <div className='card'>
                            <h2>No entries found</h2>
                        </div>
                    ) : (
                        fetchedEntries?.map((entry, index) => (
                            <div key={index} className='card'>
                                <h2>{entry.title}</h2>
                                <p>Number: {entry.number}</p>
                                <p>Points: {entry.points}</p>
                                <p>Number of comments: {entry.number_of_comments}</p>
                            </div>
                        )))
                }
            </div>
        </>
    )
}


export default Entries
