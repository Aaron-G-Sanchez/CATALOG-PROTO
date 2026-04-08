import { useOutletContext } from 'react-router'
import type { TRPCContext } from '../components/ProtectedRoute'

export const Feed = () => {
  const { client } = useOutletContext<TRPCContext>()

  const getUser = async () => {
    const user = await client.userList.query()
    console.log(user)
  }

  return (
    <>
      <h1>FEED</h1>
      <button onClick={getUser}>Call</button>
    </>
  )
}
