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
        <div className="w-[80%] flex flex-col items-start w-full gap-3 text-left">
          <div className="w-full">
            <span className="font-semibold text-xl">Host: </span>
            <span>{event.EventHost}</span>
          </div>
          {event?.EventDate && (
            <div className="w-full">
              <span className="font-semibold text-xl">When: </span>
              <span>{format(new Date(event.EventDate), "MMMM dd, yyyy")}</span>
            </div>
          )}
          <div className="w-full">
            <span className="font-semibold text-xl">Where: </span>
            <span>{event.EventLocation}</span>
          </div>
          <div className="w-full">
            <span className="font-semibold text-xl">About: </span>
            <span>{event.EventDescription}</span>
          </div>
        </div>
        <Button w="150px" bg="black" color="white" onClick={onAttendClick}>
          Attend
        </Button>
      </div>
    </Modal>
  );
};
