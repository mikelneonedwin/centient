import { Link, Navigate,  } from "react-router-dom";
import { Centient } from "../../components";

const Home = () => {

    if (localStorage.noAuth === 'true')
        return <Navigate to="/dashboard" replace={true}/>

    return (
        <div className='h-screen items-center font-poppins'>
            <div className='h-full mx-3 md:mx-2 flex items-center flex-col justify-center gap-8 -translate-y-10 md:translate-y-0'>
                <div className='mx-auto container text-center leading-[1.625em] md:leading-[1.75em] text-4xl md:text-5xl font-light'>
                    Manage your {` `}
                    <b className='text-primary/95 font-semibold'>Finances</b>
                    {` `} with <br />
                    <Centient/>
                </div>
                <p className='text-xl md:text-2xl text-white/70 text-center'>Easy management of your finances with <b className='text-primary/95'>Centient!</b></p>
            </div>
            <div className='absolute bottom-8 left-0 container flex justify-center right-0'>
                <Link to="/signup" className='w-4/5 md:w-1/2 py-2.5 bg-secondary rounded-xl text-center capitalize font-medium text-xl md:text-2xl'>
                    Get Started!
                </Link>
            </div>
        </div>
    );
}

export default Home;