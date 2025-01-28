import ModalData from "./modelData";
import ModalHeader from "./modelHeader";
import ModalButton from "./learnMoreButton";
import { CloseButton } from "@/components/ui/close-button";

const ModalContainer = ({ onCloseModal, modalData }) => {
    return (
        <div>
            <div className="flex justify-end">
                <CloseButton className="text-black" onClick={onCloseModal} />
            </div>

            <ModalHeader {...modalData.fields} />
            <div className=" place-items-center">
                <ModalData {...modalData.fields} />
                <ModalButton url={modalData.fields["Opportunity URL"]} />
            </div>
        </div>
    )
}

export default ModalContainer;