"use client";

import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { format } from "date-fns";
import { Button } from "../ui/button";

export const EventModal = ({ open, onClose, event }) => {
  const onAttendClick = () => window.open(event.EventURL, "_blank");
  if (!event) return null;
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="w-full flex justify-center items-center">
          <h1 className="font-semibold text-3xl">{event.EventName}</h1>
        </div>
        <div className="w-[60%] flex flex-col items-center w-full gap-4 text-end">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-xl">Host:</p>
            <p>{event.EventHost}</p>
          </div>
          {event?.EventDate && (
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-xl">When:</p>
              <p>{format(new Date(event.EventDate), "MMMM dd, yyyy")}</p>
            </div>
          )}
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-xl">Where:</p>
            <p>{event.EventLocation}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-xl">About:</p>
            <p className="w-[60%]">{event.EventDescription}</p>
          </div>
        </div>
        <Button w="150px" bg="black" color="white" onClick={onAttendClick}>
          Attend
        </Button>
      </div>
    </Modal>
  );
};
