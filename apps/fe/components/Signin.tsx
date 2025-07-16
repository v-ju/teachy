import InputBox from "./FormInputBox";
import FormButton from "./FormButton";


export default function SigninForm(){
    return <>
        <InputBox  placeholder="Email" type="text" viewIcon={false}/>
        <InputBox  placeholder="Password" type="password" viewIcon={true}/>
        <FormButton width={30} text="Sign in"/>
    </>
}