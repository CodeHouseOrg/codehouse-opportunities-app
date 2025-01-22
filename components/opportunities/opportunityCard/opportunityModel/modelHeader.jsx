import Image from "next/image";
import work from "../assets/work.ico";


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
            <Image src={work} alt="work logo" className="size-9" />
            <h1 className="font-extrabold max-w-[15em] text-xl">{opportunityName}</h1>
        </div>
    )
}

export default ModalHeader;