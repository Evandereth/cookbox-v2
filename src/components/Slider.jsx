// import logo from "../img/logo.png"

// export default function Slider(){

//     const text = "build a body you love";
//     const words =Array(10).fill(text)
//     const slider = [...words, ...words]

//     return(
//         <>
//             <div className=" my-10 relative overflow-hidden">
//                 <div className="w-max h-20 flex flex-row justify-center items-center gap-3 animate-slider -translate-x-5">
                    
//                     {
//                         slider.map((slide)=>
//                             <div key={Math.random()} className="w-[18em] min-w-[18em] border-l-3 pl-3">
//                                 <h1 className="text-xl lg:text-xl  font-bold uppercase">
//                                     {slide}
//                                 </h1>
//                             </div>
//                         )
//                     }

//                 </div>     
//                 <div className="w-22 h-20 bg-linear-to-r from-white to-transparent absolute top-0 -left-2" />

//                 <div className="w-22 h-20 bg-linear-to-l from-white to-transparent absolute top-0 -right-2" /> 

//             </div>
//         </>
//     )
// }





import { useState } from "react";
import profileData from "../data/admin";

export default function About(){

    const [activeProfile, setActiveProfile] = useState(0)

    const display = profileData[activeProfile]


    return(
        <>
        <div className=" w-full relative my-5">
            <div className=" heading-font text-center py-5 border-b">
                <h1 className="text-3xl font-semibold">
                    meet our professional trainers
                </h1>
            </div>
            <div className=" w-full flex flex-col justify-center items-center">

                <div className="w-full flex justify-center items-center gap-3 py-5">
                    {
                        profileData.map((profile, index)=>(
                            <div key={index} className="w-15 h-15 rounded-md cursor-pointer">
                                <img 
                                 onClick={()=>setActiveProfile(index)}
                                className="w-full h-full object-cover rounded-md "
                                src={profile.image} 
                                alt="Professional Trainers" />
                            </div>
                        ))
                    }

                </div>


                <div className="w-full md:min-h-100 flex flex-col md:flex-row gap-5 justify-between items-end p-5 md:p-0 rounded-xl bg-gray-100 md:bg-transparent">
                    <div className="w-full md:w-[40%] md:h-130 flex md:flex-col justify-start items-end md:items-start gap-3 relative">

                        <div className="w-30 h-25 md:w-full md:h-full rounded-xl cursor-pointer relative">
                            <img className="w-full h-full object-top object-cover rounded-xl"
                            src={display.image} alt="Professional Trainers" />
                        </div>

                        <div className="md:hidden">
                            <h1 className="font-semibold py-2">
                                {display.name}
                            </h1>
                            <p className="italic">{display.title}</p>
                        </div>
                    </div>

                    <div className="w-full md:w-[60%] md:min-h-130 flex flex-col justify-around items-start md:bg-black md:text-white md:rounded-xl md:p-5">
                        <div className="hidden md:flex flex-col my-3">
                            <h1 className="font-semibold py-2 text-4xl">
                                {display.name}
                            </h1>
                            <p className="italic text-2xl">{display.title}</p>
                        </div>

                        <p className="text-justify text-sm md:text-lg lg:text-xl">
                           {display.description}
                        </p>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}