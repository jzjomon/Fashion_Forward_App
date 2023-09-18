import Button from "./Button"

const SignUpCard = ({setLogin}) => {
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
                            <input type="text" placeholder="Enter your name"  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Email</label>
                            <input type="text" placeholder="Enter your email"  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Password</label>
                            <input type="text" placeholder="Enter password"  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input type="password" placeholder="Re enter password" className="shadow-2xl px-1 py-3 rounded-md" />
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