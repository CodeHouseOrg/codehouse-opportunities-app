

const ModalData = () => {
    return (
        <div className="bg-white text-black">
            <ul>
                <li className="flex pb-5 gap-2 place-items-center">
                    <h1 className="font-bold">Company:</h1>
                    <span className="text-[#900B09] text-sm">ABC Company</span>
                </li>
                <li className="flex pb-5 gap-2 place-items-center" >
                    <h1 className="font-bold">Type:</h1>
                    <span className="text-sm">Job Opportunity</span>
                </li>
                <li className="flex pb-5 gap-16" >
                    <section><span className="font-bold">Start date:</span>  <span className="text-sm">12-1-2024</span></section>
                    <section><span className="font-bold">End date:</span>  <span className="text-sm">12-31-2024</span> </section>
                </li>
                <li className=" max-w-[26rem] flex gap-4 pb-5" >
                    <h1 className="font-semibold">Description:</h1>
                    <p className="text-sm">ABC Company spring internship is now accepting applications. This opportunity at ABC Company allows current students and recent grads to apply. You will be working in the modern stack as a software engineer building both frontend and backend features.</p>
                </li>
            </ul>
        </div>
    )
}

export default ModalData;