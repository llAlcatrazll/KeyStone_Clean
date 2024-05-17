import BookingsApproved from "../../Components/BookingsApproved";
import BookingsDenied from "../../Components/BookingsDenied";
import BookingsPending from "../../Components/BookingsPending";
function BookingsPage() {
  return (
    <div className="  p-1">
      {/* <h1>BookingsPage</h1> */}
      <div
        className="w-100 justify-content-evenly align-items-center shadow-lg border-top-0 border border-light p-3 mb-5 bg-white rounded"
        // d-flex
        style={{ minHeight: "800px" }}
      >
        <BookingsApproved />
        <hr />
        <BookingsPending />
        <hr />
        <BookingsDenied />
      </div>
    </div>
  );
}

export default BookingsPage;
