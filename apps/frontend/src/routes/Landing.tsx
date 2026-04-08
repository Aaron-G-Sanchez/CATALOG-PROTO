import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'

export const Landing = () => {
  return (
    <>
      <h1>MUSE</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <h2>Lorem ipsum...</h2>
          <SignIn forceRedirectUrl={'/feed'} />
        </div>
      </SignedOut>
    </>
  )
}
