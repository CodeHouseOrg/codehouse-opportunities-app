

const ModalData = ({
    "Opportunity Type": opportunityType,
    "Opportunity Description": opportunityDescription,
    "Opportunity Name": opportunityName,
    "Partner": partner,
    "Opportunity Status": opportunityStatus,
    "Created At": startDate,
    "End Date": endDate,
    "Opportunity URL": opportunityUrl,
}) => {
    return (
        <div className="bg-white text-black">
            <ul>
                <li className="flex pb-5 gap-2 place-items-center">
                    <h1 className="font-bold">Company:</h1>
                    <span className="text-[#900B09] text-sm">ABC Company</span>
                </li>
                <li className="flex pb-5 gap-2 place-items-center" >
                    <h1 className="font-bold">Type:</h1>
                    <span className="text-sm">{opportunityType[0]}</span>
                </li>
                <li className="flex pb-5 gap-16" >
                    <section><span className="font-bold">Start date:</span>  <span className="text-sm">{startDate}</span></section>
                    <section><span className="font-bold">End date:</span>  <span className="text-sm">{endDate}</span> </section>
                </li>
                <li className=" max-w-[26rem] flex gap-4 pb-5" >
                    <h1 className="font-semibold">Description:</h1>
                    <p className="text-sm">{opportunityDescription}</p>
                </li>
            </ul>
        </div>
    )
}

export default ModalData;