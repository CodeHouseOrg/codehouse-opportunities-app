import { Box } from "@chakra-ui/react";
import OpportunityHeader from "./Header";
import SubHeader from "./subHeader";

const OpportunityHeaderContainer = () => {

    const opportunityText = {
        Header: 'Opportunities',
        Description: 'Search for jobs, funding, and more from CodeHouse partners.'
    }

    return (
        <Box className="pb-10 place-items-center">
            <OpportunityHeader Header={opportunityText.Header} />
            <SubHeader description={opportunityText.Description} />
        </Box>
    );
}

export default OpportunityHeaderContainer;