/**
 * react의 컴포넌트
 * 
 * 1.반드시 상위 태그로 감싸져야한다. / 두개의 태그를 동시에 포함할 수 없다.
 * 
 * 2. 컴포넌트 종류
 *  2.1. 함수형 컴프넌트
 *    export default function FirstComponent(){
 *      return(
 *        //컴포넌트 내용
 *      )
 *    }
 *  2.2. class 컴포넌트
 * 
 *   export default class ThirdComponent extends Component{
      render() {
       return (
       <div className="ThirdComponent">Third Component</div>
        )
      }
    }
 * 
 * 3. import문에서 {중괄호} 로 감싸지 않으면 default가 import가 된다.
 * 
 * 
 * 
 * @returns 
 */
export default function FirstComponent() {
    return (
      <div className="FirstComponent">First Component</div>
    )
}

export function FifthComponent() {
    return (
      <div className="FifthComponent">Fifth Component</div>
    )
}
  