import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
    const [data, setData]=useState({})
    const {id} = useParams()
    // console.log(id,'<<<<<');
  
    async function fetchData(){
      try {
        const {data} = await axios({
          url: `http://localhost:3100/field/${id}`
        })
        // console.log(data,'<<<<<');
        setData(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(()=>{
      fetchData()
    },[])
    
    return (
      <>
        <div className="flex items-center justify-center mt-5">
        <div className="max-w-md bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
          <div className="w-10/10">
            <img src={data.imgUrl} alt="Placeholder" className="rounded-lg" />
          </div>
          <div className="w-2/3 p-4">
            <h2 className="text-xl font-bold mb-2">Detail</h2>
            <p className="text-gray-700">{data.description}</p>
            <ul className="mt-4">
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Rp. {data.price},00</span>
              </li>
              <li className="flex items-center text-gray-700 mt-2">
                
                {localStorage.access_token ? (
                  <Link
                  to={`/booking/${data.id}`}
                  className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Booking
                </Link>
                ) : (
                  <Link to={'/login'}
                    
                  >
                   <span className="text-red-700 underline"> Login to Booking</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      </>
    );
}

export default Detail;