import { Box } from "@chakra-ui/react";
import OpportunityDetails from "./opportunityDetails";
import OpportunitiesLogo from "./opportunityLogo";
import { OpportunityModal } from "./opportunityModel/index.jsx";

const OpportunityContainer = ({
    "id": opportunityId,
    "Opportunity Type": opportunityType,
    "Opportunity Description": opportunityDescription,
    "Opportunity Name": opportunityName,
    "Partner": partner,
    "Opportunity Status": opportunityStatus,
    "Start Date": startDate,
    "End Date": endDate,
    "Opportunity URL": opportunityUrl,
    openModal,
    handleModalData
}

) => {

    return (
        <Box py={8} className="shadow-md border-solid border-[1px] border-[#B3B3B3] border-[filter: blur(4px)] p-8 grid grid-rows-subgrid row-span-3">
            <OpportunitiesLogo type={opportunityType[0]} />
            <OpportunityDetails opportunityName={opportunityName} opportunityType={opportunityType[0]} partner={partner} />
            <button
                onClick={handleModalData}
                className='bg-[#2C2C2C] px-[1.5em] text-white py-[0.5em] w-fit rounded mx-auto'
                id={opportunityId}
            >
                Learn More
            </button>
        </Box>
    )
};

export default OpportunityContainer;