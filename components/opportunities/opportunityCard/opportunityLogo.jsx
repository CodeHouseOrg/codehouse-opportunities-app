import work from "./assets/work.ico";
import Award from "./assets/Award.ico";
import zap from "./assets/Zap.ico";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

const OpportunityLogo = ({ type }) => {
  // Use a conditional statement outside the JSX
  let logo;
  let altText;

  if (type === "Full-time Employment" || type === "Internship/Co-op") {
    logo = work;
    altText = "full-time/internships";
  } else if (type === "General Events (Summits, Career Fairs, etc)") {
    logo = zap;
    altText = "events";
  } else if (type === "Scholarships") {
    logo = Award;
    altText = "scholarships";
  } else {
    logo = work;
    altText = "others";
  }

  return (
    <Box paddingBottom={5}>
      <Image src={logo} alt={altText} className="size-9" />
    </Box>
  )
};

export default OpportunityLogo;