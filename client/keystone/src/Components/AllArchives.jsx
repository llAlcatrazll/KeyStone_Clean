import Admins from "./Archives/Admins";
import Bookings from "./Archives/Bookings";
import Officers from "./Archives/Officers";
import Venues from "./Archives/Venues";
function AllArchives() {
  return (
    <div className="flex-grow-1 bg-danger-subtle d-flex flex-column">
      <div className="d-flex flex-row justify-content-between ">
        <Admins />
        <Venues />
        <Officers />
      </div>
      <div>
        <Bookings />
      </div>
    </div>
  );
}

export default AllArchives;
