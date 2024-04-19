import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReview } from "../features/review/reviewSlice";
import ReviewCard from "../components/reviewCard";

export default function Page() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.list);

  useEffect(() => {
    dispatch(fetchReview());
  }, []);
  return (
    <>
      <div>
        <h1>Review List</h1>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {reviews.map((el) => (
            <ReviewCard key={el.id} review={el} />
          ))}
        </div>
      </div>
    </>
  );
}
