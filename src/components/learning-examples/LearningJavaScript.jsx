/**
 * javascript 객체
 * 객체의 변수가 하나의 function으로 기능 가능하다
 * -> printProfile : (파라미터) => {}
 */
const person = {
    name: 'Ranga Karanam',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK',
    },
    profiles: ['twitter', 'linkedin', 'instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )
    }
}
/**
 * 컴포넌트에서 객체를 사용하는 법
 * {중괄호}로 값 표기 
 * @returns 
 */
export default function LearningJavaScript(){
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.profiles[0]}</div>
            <div>{ person.printProfile() }</div>
        </>
    )
}