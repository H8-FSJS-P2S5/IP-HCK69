import { Link } from "react-router-dom";

function Card(props) {
    const { item } = props
    return (
        <>
            <div className="card w-70 h-70 bg-base-100 shadow-xl rounded-lg ">
                <figure>
                    <img className="rounded-lg"
                        src={item.imgUrl}
                        alt="Fields"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-semibold">
                        {item.name}
                        <div className="badge badge-secondary"></div>
                    </h2>
                    <p>{item.description}</p>
                    <Link to={`/detail/${item.id}`}><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded content-center mb-2 ml-1">Info</button></Link>
                    <div className="card-actions justify-end">

                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;