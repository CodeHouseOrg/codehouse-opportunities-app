import { Center, Heading, Flex, Button, VStack } from "@chakra-ui/react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export const StudentModal = ({ student, open, onClose }) => {
  if (!student) return null;
  const studentInfo = student.fields;
  return (
    <Modal open={open} onClose={onClose} center>
      <VStack w="full" gap="2rem">
        <Flex w="full" align="start" alignItems="center" gap="2rem">
          <Center w="91px" h="91px" borderRadius="50%" bg="black">
            <p className="text-white text-3xl">
              {student.fields["First Name"][0]}
            </p>
          </Center>
          <Heading fontWeight={"bold"} fontSize={"2.5rem"}>
            {student.fields["First Name"]} {student.fields["Last Name "]}
          </Heading>
        </Flex>
        <div className="flex flex-col items-center w-full gap-8">
          <div className="w-full flex flex-col items-center w-full gap-4 text-end">
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">CodeHouse Scholar:</p>
              <p>
                {studentInfo["CodeHouse Involvement"] === "Scholar"
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">School:</p>
              <p>{studentInfo["School "]}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">Major:</p>
              <p>{studentInfo.Major?.[0]}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">Graduation Year:</p>
              <p className="w-[60%]">{studentInfo["Graduation Year"]}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">Career Path:</p>
              <p className="w-[60%]">{studentInfo["Career Interest"][0]}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-md">Skills:</p>
              <p className="w-[60%]">{studentInfo["Technical Skills"][0]}</p>
            </div>
          </div>
          <Button
            w="150px"
            bg="black"
            color="white"
            onClick={() => window.open(studentInfo["LinkedIn URL"], "_blank")}
          >
            LinkedIn
          </Button>
        </div>
      </VStack>
    </Modal>
  );
};
