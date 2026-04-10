import { useOutletContext } from 'react-router'
import type { TRPCContext } from '../components/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'

export const Feed = () => {
  const { client } = useOutletContext<TRPCContext>()

  const { refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => client.userList.query(),
    enabled: false,
  })

  const userById = useQuery({
    queryKey: ['userById', 1234],
    queryFn: () => client.userById.query({ id: 1234 }),
    enabled: false,
  })

  const getUser = async () => {
    const { data } = await refetch()

    console.log(data)
  }

  const getUserById = async () => {
    const user = await userById.refetch()
    console.log(user)
  }

  return (
    <>
      <h1>FEED</h1>
      <button onClick={getUser}>Call</button>
      <button onClick={getUserById}>Get User by ID</button>
    </>
  )
}
