import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

/**
 * createContext : context 생성
 * -> 컴포넌트간 공유할 context 생성
 * -> export const AuthContext : context export
 */
//1: Create a Context
export const AuthContext = createContext()
/**
 * useAuth 
 * -> hook을 만들어서 AuthContext값에 쉽게 접근할 수 있도록 함
 */
export const useAuth = () => useContext(AuthContext)
/**
 * AuthProvider 
 * -> 다른 컴포넌트에 context를 제공
 * -> return jsx
 */
//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username==='in28minutes' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true            
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }        
    // }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )

    //     try {

    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status==200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true            
    //         } else {
    //             logout()
    //             return false
    //         }    
    //     } catch(error) {
    //         logout()
    //         return false
    //     }
    // }


    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password)

            if(response.status==200){
                
                const jwtToken = 'Bearer ' + response.data.token
                
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }


    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }
    {/**
        isAuthenticated를 다른 컨포넌트에 제공 
    */}
    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 