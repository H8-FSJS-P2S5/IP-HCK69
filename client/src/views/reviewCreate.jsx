import { useState } from "react";
import { serverRequest } from "../utils/axios";

export default function Create() {
  const [input, setInput] = useState({
    name: "",
    location: "",
    email: "",
    description: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };

    newInput[name] = value;
    setInput(newInput);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await serverRequest.post("/review", input, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });

        navigate("/cms/companies/list");
      } catch (error) {
        console.log(error);
      }
    };
  };
  return (
    <>
      <div>
        <form>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your bio</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </label>
          <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
              checked
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
          </div>
        </form>
      </div>
    </>
  );
}
