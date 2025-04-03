import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();
  
  return session ? (
    <>
      <p>Welcome, {session.user.email}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  ) : (
    <button onClick={() => signIn()}>Sign In</button>
  );
}
