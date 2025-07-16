import InputBox from "./FormInputBox";
import FormButton from "./FormButton";



export default function SignupForm(){

    return <>
        <InputBox  placeholder="Name" type="text" viewIcon={false}/>
        <InputBox  placeholder="Email" type="text" viewIcon={false}/>
        <InputBox  placeholder="Password" type="password" viewIcon={true}/>
        <FormButton width={30} text="Sign Up"/>
    </>   
}