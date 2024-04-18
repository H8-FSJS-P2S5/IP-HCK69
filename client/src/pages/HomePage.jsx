import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function HomePage() {
    const [data, setData]=useState()

    async function fecthData(){
      try {
        const {data} = await axios({
          method:'get',
          url:"http://localhost:3100/field"
        });
        // console.log(data,'ini data<<<<');
        setData(data) 
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      fecthData()
    },[])

    return (
        <>
        <div className="grid grid-cols-4 gap-3 mt-5 ml-5 ">
          {data &&
            data.map((item) => <Card item={item} key={item.id} />)}
        </div>
        
        </>
    );
}

export default HomePage;