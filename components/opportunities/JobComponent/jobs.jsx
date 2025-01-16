import OpportunityContainer from "./opportunityContainer";
import { Grid } from "@chakra-ui/react";


const Jobs = ({ opportunitiesData = [], openModal }) => {
  return (
    <>
      {
        opportunitiesData.map((opportunity) => (
          <OpportunityContainer key={opportunity.id} {...opportunity.fields} openModal={openModal} />
        ))
      }
    </>
  )
}
