import { useApi } from "@backstage/core-plugin-api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { UserProfile } from "../utils/types"
import { githubApiRef } from "./../api"


export function useAuthUser(isSignedIn: boolean) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const githubClient = useApi(githubApiRef)

    useQuery(['git-auth-user'], ()=>{
        return githubClient.getAuthenticatedUser()
    }, {
        enabled: isSignedIn, 
        cacheTime: 20000,
        staleTime: 10000,
        // refetchOnMount: false, 
        refetchOnWindowFocus: true,
        refetchInterval: 120000, // stops when window is not focused
        onSuccess: (data)=>{
            setUser(data)
        }
    })

    return { user }
}