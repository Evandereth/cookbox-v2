import logo from "../img/logo.png"

export default function Slider(){

    const text = "build a body you love";
    const words =Array(10).fill(text)
    const slider = [...words, ...words]

    return(
        <>
            <div className=" my-10 relative overflow-hidden">
                <div className="w-max h-20 flex flex-row justify-center items-center gap-3 animate-slider -translate-x-5">
                    
                    {
                        slider.map((slide)=>
                            <div key={Math.random()} className="w-[18em] min-w-[18em] border-l-3 pl-3">
                                <h1 className="text-xl lg:text-xl  font-bold uppercase">
                                    {slide}
                                </h1>
                            </div>
                        )
                    }

                </div>     
                <div className="w-22 h-20 bg-linear-to-r from-white to-transparent absolute top-0 -left-2" />

                <div className="w-22 h-20 bg-linear-to-l from-white to-transparent absolute top-0 -right-2" /> 

            </div>
        </>
    )
}