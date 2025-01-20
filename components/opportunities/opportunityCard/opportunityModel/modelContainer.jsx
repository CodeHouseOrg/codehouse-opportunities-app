import ModalData from "./modelData";
import ModalHeader from "./modelHeader";
import ModalButton from "./learnMoreButton";
import { CloseButton } from "@/components/ui/close-button";

const ModalContainer = ({ onCloseModal }) => {

    return (
        <div>
            <div className="flex justify-end">
                <CloseButton className="text-black" onClick={onCloseModal} />
            </div>

            <ModalHeader />
            <div className=" place-items-center">
                <ModalData />
                <ModalButton />
            </div>
        </div>
    )

}

export default ModalContainer;