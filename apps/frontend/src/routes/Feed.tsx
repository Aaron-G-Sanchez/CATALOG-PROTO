import { useOutletContext } from 'react-router'
import type { TRPCContext } from '../components/ProtectedRoute'

export const Feed = () => {
  const { client } = useOutletContext<TRPCContext>()

  const getUser = async () => {
    const userList = await client.userList.query()
    console.log(userList)
  }

  const getUserById = async () => {
    const user = await client.userById.query({ id: 1234 })
    console.log(user)
  }

  const createUser = async () => {
    const newUser = await client.userCreate.mutate({
      user: { user_id: 4321, name: 'Chravis' },
    })

    console.log(newUser)
  }

  return (
    <>
      <h1>FEED</h1>
      <button onClick={getUser}>Call</button>
      <button onClick={getUserById}>Get User by ID</button>
      <button onClick={createUser}>Create User</button>
    </>
  )
}
