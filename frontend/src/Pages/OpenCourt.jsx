import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { instance } from "../config/axios";
import { useSelector } from "react-redux";
import { BASEURL } from "../Constants/baseUrl";
import { NavBar } from "../Components/NavBar";
import Button from "../Components/Button";
import AlertModal from "../Components/AlertModal";
import { TIMINGS } from '../Constants/Timings.js';
import swall from 'sweetalert2'

const OpenCourt = () => {
  const { id } = useParams();
  const [timings, setTimings] = useState(TIMINGS);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [openTimings, setOpenTimings] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [latestDate, setLatestDate] = useState(null);
  const [rate, setRate] = useState(null);
  const [data, setData] = useState();
  const [mainTimings, setMainTimings] = useState({
    startDate: "",
    endDate: "",
  });
  const numRef = useRef();
  useEffect(() => {
    instance.get(`/users/getCourt`, { params: { id } }).then(({ data }) => {
      setData(data);
    }).catch(err => {
      console.log(err);
    })
  }, [id, user]);
  useEffect(() => {
    if (user?.role === 2 && user?._id === data?.userId) {
      instance.get('/users/getLatestDate', { params: { courtId: id } }).then(res => {
        setLatestDate(res.data.latestDate);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [open === true])
  const addTime = (ele) => {
    setSelectedTimings([...selectedTimings, ele]);
    const timing = timings.filter(time => time !== ele);
    setTimings(timing);
  }
  const removeTime = (ele) => {
    const timing = selectedTimings.filter(time => time !== ele);
    setSelectedTimings(timing);
    setTimings([ele, ...timings])
  }
  const handleSubmit = () => {
    if (mainTimings.startDate && mainTimings.endDate && rate && selectedTimings.length > 0) {
      instance.post("/vendor/addTimings", {
        data: {
          date: mainTimings,
          rate,
          schedules: selectedTimings,
          courtId: id,
        }
      }).then(res => {
        setSelectedTimings([]);
        setTimings(TIMINGS);
        setMainTimings({
          startDate: "",
          endDate: "",
        });
        setRate(null);
        numRef.current.value = null;
        swall.fire({
          title: "Success",
          text: "successfully added bookings",
          icon: "success",
        }).then(() => {
          setOpen(false);
        })
      }).catch(err => {
        setSelectedTimings([]);
        setTimings(TIMINGS);
        setMainTimings({
          startDate: "",
          endDate: "",
        });
        setRate(null);
        numRef.current.value = null;
        swall.fire({
          text: "Failed to add bookings",
          icon: "error"
        }).then(() => {
          setOpen(false);
        })
      });

    } else {
      swall.fire({
        title: "Inputs cannot be empty !",
        icon: "error",
        confirmButtonColor: 'orange',
      })
    }
  }
  return (
    <>
      <NavBar />
      <div className="p-4 flex md:flex-row flex-col  ">
        <div className="md:w-[55%] p-4 ">
          <img src={`${BASEURL}/images/${data?.image}`} alt="courtimg" className=" rounded-lg shadow-xl shadow-gray-900/50 w-[100%] " />
        </div>
        <div className="md:w-[45%] p-4  ">
          <div className=" md:flex justify-around border p-10 rounded-lg border-gray-400 shadow-xl shadow-gray-200">
            <div className="flex flex-col gap-5">
              <h1>Name : {data?.name}</h1>
              <h2>Location : {data?.location}</h2>
              <h3>About : {data?.about}</h3>
              <h4>rating : </h4>
            </div>
            <div className="flex flex-col gap-5 pt-3 md:pt-0">
              <h1>Owner Name :</h1>
              <h2>Contact :</h2>
            </div>
          </div>
          {user?.role === 2 && user?._id === data?.userId && (<div className="p-4">
            <Button label="Open Bookings" handleClick={() => setOpen(true)} />
          </div>)}
        </div>
      </div>
      <AlertModal open={open} onClose={() => setOpen(false)}>
        <div className="md:flex justify-between ">
          <h1 className="text-center font-bold ">Court : {data?.name}</h1>
          <h1 className="text-center font-semibold">Location : {data?.location}</h1>
        </div>
        <div className="md:flex pt-4">
          <div>
            <label>Start : </label>
            <input type="date" min={latestDate?.split('T')[0] ?? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` } value={mainTimings.startDate} onChange={(e) => setMainTimings({ ...mainTimings, startDate: e.target.value })} className="border mr-5 mb-4 border-black rounded" />
          </div>
          <div>
            <label>End : </label>
            <input type="date" min={mainTimings.startDate || latestDate?.split("T")[0]} value={mainTimings.endDate} onChange={(e) => setMainTimings({ ...mainTimings, endDate: e.target.value })} className="border border-black rounded" />
          </div>
        </div>
        <div className="pb-4 text-center">
          <label>Rate : </label>
          <input type="number" ref={numRef} onChange={(e) => setRate(e.target.value)} className="border border-black rounded" />
        </div>
        <div className="md:flex justify-around">
          <div>
            <div className="text-center">
              <button className="border border-orange-600 p-2 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white  transition-all" onClick={() => setOpenTimings(!openTimings)}>Select Timings</button>
            </div>
            <div className="text-center relative overflow-auto no-scrollbar h-52">
              <ul className="absolute right-[10%] left-[10%]" >
                {openTimings && timings.map((ele, i) => (
                  <li key={i} onClick={() => addTime(ele)} className="border cursor-pointer mt-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded transition-all mb-2">{ele.time}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="text-center">
              <button className="border border-orange-600 p-2 rounded-lg text-orange-600 hover:cursor-auto">Selected Timings</button>
            </div>
            <div className="text-center relative overflow-auto no-scrollbar h-52">
              <ul className="absolute right-[10%] left-[10%]" >
                {selectedTimings && selectedTimings.map((ele, i) => (
                  <li key={i} onClick={() => removeTime(ele)} className="border cursor-pointer mt-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded transition-all mb-2">{ele.time}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Button label="Submit" handleClick={handleSubmit} />
        </div>


        {/* <div className="text-center w-53">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12  text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="font-mono font-medium my-3" >{alertMessage}</h2>
          <div className="text-center mt-1 " onClick={() => setOpen(false)}>
            <button className="border px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all  ">Ok</button>
          </div>
        </div> */}
      </AlertModal>
    </>
  )
}

export default OpenCourt