import Image from "next/image";
import work from "../assets/work.ico";
import OpportunityLogo from "../opportunityLogo";

const ModalHeader = (
    {
        "Opportunity Type": opportunityType,
        "Opportunity Description": opportunityDescription,
        "Opportunity Name": opportunityName,
        "Partner": partner,
        "Opportunity Status": opportunityStatus,
        "Created At": startDate,
        "End Date": endDate,
        "Opportunity URL": opportunityUrl,
    }
) => {

    return (
        <div className="bg-white text-black flex place-items-center gap-7 pb-4">
            <OpportunityLogo type={opportunityType[0]} />
            <h1 className="font-extrabold max-w-[15em] text-xl">{opportunityName}</h1>
        </div>
    )
}

export default ModalHeader;