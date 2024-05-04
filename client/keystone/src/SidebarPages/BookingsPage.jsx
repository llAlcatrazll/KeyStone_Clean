import BookingsApproved from "../Components/BookingsApproved";
import BookingsDenied from "../Components/BookingsDenied";
import BookingsPending from "../Components/BookingsPending";
function BookingsPage() {
  return (
    <div>
      <h1>BookingsPage</h1>
      <div
        className="w-100 justify-content-evenly align-items-center "
        // d-flex
        style={{ height: "auto" }}
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
