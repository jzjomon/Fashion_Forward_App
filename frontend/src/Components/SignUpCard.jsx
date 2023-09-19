import { useState } from "react"
import Button from "./Button"

const SignUpCard = ({setLogin}) => {
    const [pShow, setPShow] = useState(false);
    const [details, setDetails] = useState({name: "", email: "", password: "", rePass: ""});
    const handleClick = () => {

    }
  return (
    <>
    <div className='xl:w-2/4 md:w-3/4 w-3/4 sm:w-2/4 px-10 h-fit  shadow-2xl rounded-xl bg-gray-100 overflow-auto py-5 animate-born'>
                <div className="mt-6">
                    <h1 className="text-3xl font-semibold text-slate-700">Welcome to <span className="font-bold italic"><span className="text-orange-500 text-4xl font-serif">S</span>tyle<span className="text-orange-500 text-4xl font-serif">Z</span>one</span></h1>
                    <p className="mt-3 text-xl text-slate-600 font-medium"> One step closer to fashion bliss. Register and shop with style.</p>
                </div>
                <div className="mt-9">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Name</label>
                            <input type="text" placeholder="Enter your name" onChange={(e) => setDetails({...details,name:e.target.value})}  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Email</label>
                            <input type="text" placeholder="Enter your email" onChange={(e) => setDetails({...details,email:e.target.value})}  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" ><div className="flex gap-4">Password <span className="flex items-center"> {
                                pShow ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(false)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setPShow(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }</span></div></label>
                            <input type={pShow ? 'text' : 'password'}placeholder="Enter password" onChange={(e) => setDetails({...details,password:e.target.value})}  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input type={pShow ? 'text' : 'password'} placeholder="Re enter password" onChange={(e) => setDetails({...details,rePass:e.target.value})} className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <Button label='Sign Up' handleClick={handleClick}/>
                        <div className="text-center">
                            <span className="text-gray-600 text-sm font-medium">Already have an account? </span><span className="text-orange-500 italic font-medium text-sm cursor-pointer" onClick={() => setLogin(true)}>Log In</span>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SignUpCard