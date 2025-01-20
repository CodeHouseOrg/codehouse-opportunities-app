import OpportunityContainer from "./opportunityContainer";
import { Grid } from "@chakra-ui/react";

const opportunities = {
  "records": [
    {
      "id": "recXXXXXXX",
      "fields": {
        "Opportunity URL": "https://example.com/opportunity1",
        "Partner": "ABC Company",
        "Opportunity Name": "ABC Internship",
        "Opportunity Status": "Active",
        "Opportunity Type": "Job Opportunity",
        "Opportunity Description": "An exciting opportunity to intern with a leading software company.",
        "Start Date": "2024-06-01",
        "End Date": "2024-08-31",
        "Created At": "2023-12-13T10:00:00.000Z"
      },
      "createdTime": "2023-12-13T10:00:00.000Z"
    },
  ]
}

export const Jobs = ({ openModal }) => {
  return (
    <Grid>
      {
        opportunities["records"].map((opportunity) => (
          <OpportunityContainer key={opportunity.id} {...opportunity.fields} openModal={openModal} />
        ))
      }
    </Grid>
  )
}