/** useParams 
 * -> Returns an object of key/value pairs of the dynamic params 
 * from the current URL  
 * TodoApp.jsx 의 <Route path='/welcome/:username'
 * -> WelcomComponent에 username 넘겨줌 (java의 @Pathvariable)
 */
import {useParams, Link} from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {
    /** useParams hook 사용
     *  {중괄호} : 객체를 직접 받음 (params.username 대신 )
     */
    const {username} = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        console.log('called')
              
        retrieveHelloWorldPathVariable('Ranga', authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup') )

    }

    function successfulResponse(response) {
        console.log(response)
        //setMessage(response.data)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent