function UserAnalytics() {
  return (
    <div>
      <h3>User Analytics</h3>
      <div
        className="w-100 bg-info-subtle  d-flex justify-content-evenly align-items-center "
        style={{ height: "200px" }}
      >
        <div>registered admins</div>
        <div className="vr"></div>
        <div>registered users</div>
        <div className="vr"></div>
        <div>registered clubs</div>
        <div className="vr"></div>
        <div>total users</div>
      </div>
    </div>
  );
}

export default UserAnalytics;
