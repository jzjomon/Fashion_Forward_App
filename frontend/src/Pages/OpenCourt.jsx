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
  const [slot, setSlot] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [schedulesId, setSchedulesId] = useState([]);
  const numRef = useRef();
  useEffect(() => {
    instance.get(`/users/getCourt`, { params: { id } }).then(({ data }) => {
      setData(data);
    }).catch(err => {
      console.log(err);
    })
  }, [id]);
  useEffect(() => {
    getSlotData();
  }, [])
  const getSlotData = () => {
    instance.get('/users/getSlots', { params: { date: selectedDate, courtId: id } }).then(res => {
      setSlot(res.data.response);
    })
  };
  useEffect(() => {
    if (user?.role === 2 && user?._id === data?.userId) {
      instance.get('/vendor/getLatestDate', { params: { courtId: id } }).then(res => {
        setLatestDate(res.data.latestDate);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [open === true]);
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

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    
    const arr = await selectedSchedules.map(ele =>  ele._id);
   
    // creating a new order
    const result = await instance.post(BASEURL + "/payment/orders", { data: arr });

    if (!result) {

      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
  
    const { amount, id: order_id, currency } = result.data.order;
    const idArr = result.data.idArr;

    const options = {
      key: "rzp_test_GdkuntxOlaolUC", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await instance.post(BASEURL + "/payment/success", { data , idArr });

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const handleSchedules = (i) => {
    setSelectedSchedules([...selectedSchedules, slot[i]]);
    const arr = slot.filter(ele => ele !== slot[i]);
    setSlot(arr);
  };
  const handleSlot = (i) => {
    setSlot([selectedSchedules[i], ...slot]);
    const arr = selectedSchedules.filter(ele => ele !== selectedSchedules[i]);
    setSelectedSchedules(arr);
  }
  const book = () => {
    swall.fire({
      title: "Do you want to book this schedules ?",
      icon: "question",
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        displayRazorpay();
      }
      getSlotData();
      setSelectedSchedules([]);
    })
  }
  console.log(slot);
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
          <div className="text-center p-4">
            <label className="font-bold text-xl">Select a date : </label>
            <input type="date" min={new Date().toISOString().split("T")[0]} value={new Date(selectedDate).toISOString().split("T")[0]} onChange={(e) => setSelectedDate(new Date(e.target.value))} className="border border-orange-600 ps-2 pe-2 m-2 rounded text-orange-600" />
            <Button label="Get Schedules" handleClick={() => getSlotData()} />
          </div>
          <div className="flex justify-between">
            <div className="p-4 w-[50%]">
              {slot.length > 0 ? <h1 className="text-center font-bold text-2xl p-2 ">Select Schedule</h1> : <h1 className="text-center font-bold text-2xl p-2 ">No Schedules Available</h1>}
              {slot.map((ele, i) => (
                <button key={i} className={`border rounded m-1 p-2 ${ele.bookedBy ? `border-blue-300 text-blue-300 transition-all ` : `border-orange-600 text-orange-600 `} `} onMouseOver={ ele.bookedBy && ((e) => e.target.innerHTML = "already booked")} onMouseLeave={ele.bookedBy && ((e) => e.target.innerHTML = ele.slot.time)} onClick={() => { !ele.bookedBy && handleSchedules(i)}}>{ele.slot.time}</button>
              ))}
            </div>
            <div className="p-4 w-[50%]">
              {selectedSchedules.length > 0 ? <h1 className="text-center font-bold text-2xl p-2 ">Selected Schedule</h1> : <h1 className="text-center font-bold text-2xl p-2 ">No Schedules Selected</h1>}
              {selectedSchedules.map((ele, i) => (
                <button key={i} className="border p-2 border-orange-600 text-orange-600 rounded m-1" onClick={(e) => handleSlot(i)}>{ele.slot.time}</button>
              ))}
              {selectedSchedules.length > 0 && <Button label="Book" handleClick={book} />}
            </div>
          </div>
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
            <input type="date" min={latestDate?.split('T')[0] ?? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`} value={mainTimings.startDate} onChange={(e) => setMainTimings({ ...mainTimings, startDate: e.target.value })} className="border mr-5 mb-4 border-black rounded" />
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