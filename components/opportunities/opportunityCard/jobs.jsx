import OpportunityContainer from "./opportunityContainer";
import { Grid } from "@chakra-ui/react";


export const Jobs = ({ opportunitiesData = [], openModal, handleModalData }) => {

  return (
    <>
      {
        opportunitiesData.map((opportunity) => (
          <OpportunityContainer key={opportunity.id} {...opportunity.fields} {...opportunity} openModal={openModal} handleModalData={handleModalData} />
        ))
      }
    </>
  )
}
