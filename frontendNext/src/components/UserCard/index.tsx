import { User } from "@/app/reduxstate/api"
import Image from "next/image"

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="mb-3 bg-white p-4 shadow dark:text-white dark:bg-zinc-900 rounded-md">
      <div className="flex items-center rounded border p-4 shadow">
        {user.ProfilePictureURL && (
          <Image
            src={user.ProfilePictureURL || "/cat1.png"}
            alt="profile picture"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <div className="ml-3">
          <h3>{user.Username}</h3>
          <p>{user.Email}</p>
        </div>
      </div>
    </div>

  )
}

export default UserCard
