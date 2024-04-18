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
              <span className="label-text-alt">Top Right label</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span>
            </div>
          </label>
        </form>
      </div>
    </>
  );
}
