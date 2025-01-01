import { useState } from 'react'
/** useNavigate : 다른 페이지를 탐색할 수 있는 hook 중에 하나 (라우터) */
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent() {

    const [username, setUsername] = useState('in28minutes')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    
    const navigate = useNavigate()

    const authContext = useAuth()
   /**
    * onChange 이벤트
    * react state와 dom의 동기화
    * @param {*} event 
    */
    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    /**
     * 인증 실패 시 showErrorMessage false로 set
     * -> errorMessage 노출 
     */
    async function handleSubmit() {
        if(await authContext.login(username, password)){
            /** 
             * navagate hook
             * -> path로 redirect
             */
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Time to Login!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed. 
                                                            Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent