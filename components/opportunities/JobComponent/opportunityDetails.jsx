import { Box } from "@chakra-ui/react";

const OpportunityDetails = ({ opportunityName, partner, opportunityType }) => {

    return (
        <Box className="pb-5">
            <p className=" font-extrabold max-w-[15em] text-xl">{opportunityName}</p>
            <p className=" font-[400] text-lg">{partner}</p>
            <p className=" font-[100] text-xm">{opportunityType}</p>
        </Box>
    )
}

export default OpportunityDetails;