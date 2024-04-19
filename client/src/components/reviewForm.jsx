import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReview, updateReview } from "../features/review/reviewSlice";
import { PropTypes } from "prop-types";

export default function Form({ type, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    description: "",
    score: 0,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (type == "Created") await dispatch(createReview(input));
      else await dispatch(updateReview(input, data.id));
      navigate("/cms/companies/list");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            onChange={handleInput}
            value={data.title || ""}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered h-24"
            defaultValue={data.description || ""}
            placeholder="Desc"
            onChange={handleInput}
          ></textarea>
        </label>
        <div className="rating rating-lg rating-half">
          <input
            type="radio"
            name="score"
            value={0}
            className="rating-hidden"
          />
          <input
            type="radio"
            name="score"
            value={1}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="score"
            value={2}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="score"
            value={3}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="score"
            value={4}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="score"
            value={5}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="score"
            value={6}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="score"
            value={7}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="score"
            value={8}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="score"
            value={9}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="score"
            value={10}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
}
Form.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
};
