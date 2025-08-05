import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../utils/lib/options";
import Button from "../../components/GenericButton";



export default async function Dashboard(){

    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/signin")
    }
    return (
        <div>
            <span>Welcome {session.user.name}</span>
            <Button text="Logout" variant="logout"/>
        </div>
    )
}