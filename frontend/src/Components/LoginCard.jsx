import Button from "./Button"

const LoginCard = ({setLogin}) => {
    const handleClick = () => {

    } 
    return (
        <>
            <div className='xl:w-2/4 md:w-3/4 w-3/4 sm:w-2/4 px-10 h-fit  shadow-2xl rounded-xl bg-gray-100 overflow-auto py-5 animate-born'>
                <div className="mt-6">
                    <h1 className="text-3xl font-semibold text-slate-700">Login to <span className="font-bold italic"><span className="text-orange-500 text-4xl font-serif">S</span>tyle<span className="text-orange-500 text-4xl font-serif">Z</span>one</span></h1>
                    <p className="mt-3 text-xl text-slate-600 font-medium"> <span className="font-serif font-semibold">Discover</span>, <span className="font-serif font-semibold">shop</span>, <span className="font-serif font-semibold">repeat</span>. Login for the ultimate fashion experience.</p>
                </div>
                <div className="mt-9">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium" >Username</label>
                            <input type="text" placeholder="Your username"  className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-600 font-medium">Password</label>
                            <input type="password" placeholder="Your password" className="shadow-2xl px-1 py-3 rounded-md" />
                        </div>
                        <Button label='Log In' handleClick={handleClick}/>
                        <div className="text-center">
                            <span className="text-gray-600 text-sm font-medium">Don't have an account? </span><span className="text-orange-500 italic font-medium text-sm cursor-pointer" onClick={() => setLogin(false)}>Create One</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginCard