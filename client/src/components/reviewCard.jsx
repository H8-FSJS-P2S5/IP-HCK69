import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ key, review }) {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate("/reviews/" + key)}>
        <div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={review.User.imageURL} alt={review.User.fullName} />
            </div>
          </div>
          <h3>{review.User.fullName}</h3>
        </div>
        <div>
          <h3>{review.title}</h3>
          <p>{review.description}</p>
          <div>{review.score}</div>
        </div>
        <div>
          <img
            className="mask mask-square"
            src={review.Manhwa.imageURL}
            alt={review.Manhwa.title}
          />
          <h3>{review.Manhwa.title}</h3>
        </div>
      </div>
    </>
  );
}
Card.propTypes = {
  key: PropTypes.integer,
  review: PropTypes.object,
};
