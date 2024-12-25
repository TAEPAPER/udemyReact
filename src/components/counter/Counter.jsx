import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButton'

export default function Counter() {
    /**
     * state : 각 컴포넌트의 데이터 저장소 역할을 한다
     * useState는 항상 두 가지를 반환한다.
     * -> 현재 상태값과 그 값을 업데이트하는 함수 (각 0,1 번째 index)
     * 
     * const [count, setCount] = useState(0);
     * -> useState(0) : 0으로 초기화
     * -> 반환값(array) : [0, 값을 업데이트하는 function]
     * -> 반환값(array)을 [count, setCount] 에 맵핑 
     * -> setCount()를 하면 count를 업데이트한다.
     */
    const [count, setCount] = useState(0)

    function incrementCounterParentFunction(by) {
        setCount(count + by)
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by)
    }

    function resetCounter() {
        setCount(0)
    }

    return (
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} 
                incrementMethod={incrementCounterParentFunction} 
                decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={2} 
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={5} 
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction}/>
            <button className="resetButton" 
                        onClick={resetCounter}
                >Reset</button>
        </>
    )
}

