import { useEffect, useState } from "react";
import axios from "axios";
import CardNews from "../components/CardNews";

function NewsPage() {
    const [data, setData] = useState([]);

    async function fecthData(){
      try {
        const {data} = await axios({
          method:'get',
          url: "https://newsapi.org/v2/top-headlines?country=id&category=sports&apiKey=5082631cc01e43429fe942871cd3c73b",
  
        });
        // console.log(data.sources,'ini data<<<<');
        setData(data.sources) 
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
              data.map((item) => <CardNews item={item} key={item.id} />)}
        </div>
      </>
    );
}

export default NewsPage;