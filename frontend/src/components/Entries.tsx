import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { get } from '../services/api'
import { Entry, EntryResponse } from '../models/InterfaceModels'

const Entries = () => {
    const [fetchedEntries, setFetchedEntries] = useState<Entry[]>([] as Entry[])

    const { isFetching, data, isFetched, refetch } = useQuery({
        queryKey: ['get_entries'],
        queryFn: async () => {
            const response = await get<EntryResponse>('/get_entries')

            console.log(response.data)
            return response.data.result
        },

        enabled: false,

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

    const handleGetEntries = async () => {
        refetch()
    }

    useEffect(() => {
        console.log('useEffect', data)
        setFetchedEntries(data as Entry[])
    }, [data])

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: 0,
            width: '100%'
        }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%'
                }}
            >

                <a href="#" target="_blank">
                    <img
                        src="https://images.vexels.com/media/users/3/304394/isolated/preview/35c0a097105dd6a498c90c597c3b01a5-araa-a-rosa-y-morada.png"
                        className="spider logo" alt="Spider logo"
                        height={500}
                    />
                </a>

                <h1>Web Crawler</h1>
                <div className='card' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyItems: 'center',
                    gap: '1rem',

                }}>
                    <button
                        onClick={handleGetEntries}
                        style={{
                            backgroundColor: 'darkblue',
                            width: 300
                        }}
                        disabled={isFetching}
                    >
                        See results / Update Results
                    </button>
                    <button
                        onClick={handleFilterMoreThanFive}
                        style={{
                            width: 300
                        }}
                        disabled={isFetching}>
                        Get titles with more than 5 words
                    </button>
                    <button
                        onClick={handleFilterLessThanFive}
                        style={{
                            width: 300
                        }}
                        disabled={isFetching}
                    >
                        Get titles with less than or equal to 5 words
                    </button>
                </div>
            </div>

            <div style={{
                width: '100%',
                height: '500px',
                whiteSpace: 'nowrap',
                overflowY: 'scroll',
                overflowX: 'visible',
                alignItems: 'center'
            }}>
                <h2>
                    RESULTS
                </h2>
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
                                <h3>{entry.title}</h3>
                                <p>Number: {entry.number}</p>
                                <p>Points: {entry.points}</p>
                                <p>Number of comments: {entry.number_of_comments}</p>
                            </div>
                        )))
                }

            </div>
        </div>
    )
}


export default Entries
