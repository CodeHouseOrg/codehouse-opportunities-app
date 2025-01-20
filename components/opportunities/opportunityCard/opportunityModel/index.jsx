"use client";

import { Modal } from "react-responsive-modal";
import ModalContainer from "./modelContainer";

import 'react-responsive-modal/styles.css';

export function OpportunityModal({ isOpen, onClose }) {
    return (
        <Modal open={isOpen} onClose={onClose} showCloseIcon={false} center>
            <ModalContainer onCloseModal={onClose} />
        </Modal>
    );
}
