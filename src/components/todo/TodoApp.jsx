import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
/** AuthContext import해서 씀 */
import AuthProvider, { useAuth } from './security/AuthContext'

import './TodoApp.css'

/**
 * 사용자가 로그인 했을 때만 접근 가능하게 함
 * @param {children} param
 * <AuthenticatedRoute>
    <WelcomeComponent />
  </AuthenticatedRoute> 
  -> children은 <WelcomeComponent/> 이다.
 */
function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children
    // /로 redirect 시킴 
    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            {/**
             * <AuthProvider> 로 감쌈
             * -> AuthContext.js 의 function AuthProvider({ children }) {...}
             *    에서 감싸진 컴포넌트들이 children임
             * -> AuthProvider가 children들에게 context 제공 
             */}
            <AuthProvider>
                <BrowserRouter>
                    {/** 
                     * 공통 컴포넌트 
                     * -> 어떤 컴포넌트로 이동하더라도 
                     * Header, Footer가 화면에 노출 
                     */}
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />               
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent /> 
                            </AuthenticatedRoute>
                        } />
  

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
