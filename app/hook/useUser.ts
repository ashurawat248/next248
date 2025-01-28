import { useRouter } from "next/navigation"
import { useEffect} from "react";
import { useUser as useClerkUser } from '@clerk/nextjs';
import { useSelector } from "react-redux";



const useUser =  () => {
    // const { isLoaded, isSignedIn, user } = useClerkUser();
    const {user} = useSelector((store:any)=> store.section)
    const userId = user.newUser._id
    const router = useRouter(); 
    useEffect(() => { 
        if (!user && !userId) { 
            router.push('/auth/sign-in'); 
        } 
    }, [user, userId]);
     return user;
}

export default useUser;