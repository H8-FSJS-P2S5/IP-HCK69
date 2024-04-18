import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Booking() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { id } = useParams();
    //   console.log(id,'<<<<<');
  
    async function fetchData() {
      try {
        const { data } = await axios({
          url: `http://localhost:3100/field/${id}`,
        });
        // console.log(data,'<<<<<');
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
  
    const [input, setInput] = useState({
      title: "",
      duration: "",
      FieldId: 0,
      startTime: null,
      endTime: null,
    });
  
    const handleInput = (event) => {
      const { name, value } = event.target;
      setInput({
        ...input,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        input.FieldId=id
        const { data } = await axios({
          method: "post",
          url: `http://localhost:3100/booked/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
          data: input,
        });
        // console.log(data.transactionToken,'<<<<<<<<<<<<<');
        window.snap.pay(data.transactionToken, {
          onSuccess: async function(result){
            /* You may add your own implementation here */
            console.log(result);
            await axios({
              method: "patch",
              url: 'http://localhost:3100/payment',
              data: {
                bookingId: data.bookingId
              },
              headers: {
                Authorization: "Bearer " + localStorage.accessToken,
              },
            })
          }
        });
  
        // navigate("/booking/list");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
      }
    };
  
    return (
      <>
        <div className="flex items-center justify-center mt-5">
          <div className="max-w-md bg-gray-200 p-4 rounded-lg shadow-md flex items-center">
            <div className="w-1/3">
              <img src={data.imgUrl} alt="lapangan" className="rounded-lg" />
            </div>
            <div className="w-2/3 p-4">
              <h2 className="text-xl font-bold mb-2">
                Booking <br /> {data.name}
              </h2>
              <p className="text-gray-700">{data.description}</p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-700">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>price : Rp. {data.price},00</span>
                </li>
                <form onSubmit={handleSubmit}>
                  <li className="flex items-center text-gray-700 mt-2">
                    <div className="mt-4">
                      <input
                        type="text"
                        id="name"
                        name="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInput}
                        placeholder="Booking atas nama"
                      />
                    </div>
                  </li>
                  <li className="flex items-center text-gray-700 mt-2">
                    <div className="mt-4">
                      <input
                        type="number"
                        id="name"
                        name="duration"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="lama main /jam"
                        onChange={handleInput}
                      />
                    </div>
                  </li>
                  <li className="flex items-center text-gray-700 mt-2">
                    <div className="mt-4">
                      <input
                        type="time"
                        id="name"
                        name="startTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInput}
                        placeholder="startTime"
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        type="time"
                        id="name"
                        name="endTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInput}
                        placeholder="end Time"
                      />
                    </div>
                  </li>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 text-xl text-white rounded-md mt-3"
                  >
                    Booking
                  </button>
                </form>
                {/* <button
                    // type="submit"
                    onClick={handlePay}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 text-xl text-white rounded-md mt-3"
                  >
                    Payment
                  </button> */}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default Booking;