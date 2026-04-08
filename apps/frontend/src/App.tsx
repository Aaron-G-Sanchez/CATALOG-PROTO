import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

import './App.css'
import { trpc } from './util/trpc'

function App() {
  const handleClick = async () => {
    // Calling `userByID` because its a public procedure. (no auth middleware.)
    // See appRouter in server/src.
    const users = await trpc.userById.query({ id: '123' })

    console.log(users)
  }

  return (
    <>
      <div>
        <h1>HELLO WORLD</h1>
      </div>
      <button onClick={handleClick}>call</button>

      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
