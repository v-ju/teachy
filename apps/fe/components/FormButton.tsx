
interface FormButtonProps {
    text: string
    width: string | number
}

export default function FormButton(props:FormButtonProps){
    return (
        <button className={`w-${props.width} border  rounded-3xl px-5 py-2 my-3`}>
            {props.text}
        </button>
    )
}