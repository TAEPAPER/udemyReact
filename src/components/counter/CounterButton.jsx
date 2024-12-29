import {PropTypes} from 'prop-types'

export default function CounterButton({by, incrementMethod, decrementMethod}) {
    return (
        <div className="Counter">
            <div>
                <button className="counterButton" 
                        onClick={() => incrementMethod(by)}
                >+{by}</button>
                <button className="counterButton" 
                        onClick={() => decrementMethod(by)}
                >-{by}</button>
 
            </div>
        </div>
    )
}
/**
 * 컴포넌트의 props 타입 지정
 */
CounterButton.propTypes = {
    by: PropTypes.number
}
/**
 * 컴포넌트의 props 디폴트 값 지정
 */
CounterButton.defaultProps = {
    by: 5
}