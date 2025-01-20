import { Button } from "@chakra-ui/react";



const ModalButton = ({ url }) => {

    console.log(url)
    return (
        <a className="bg-[#2C2C2C] text-white p-[.75em] px-[1em] text-sm rounded" href={url} target="_blank">
            Learn More
        </a>

    )

}

export default ModalButton;