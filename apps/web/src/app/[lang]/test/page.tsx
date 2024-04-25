import { auth, signIn } from "../../../../auth"
 
export default async function UserAvatar() {
  let login = await signIn("credentials", { password: process.env.PASSWORD , email: process.env.USERNAME, redirect:false} );
  const session = await auth();
 
  if (!session?.user) return null
    console.log("session ",session)
  return (
    <div>
      <img src={session.user.img} alt="User Avatar" />
    </div>
  )
}