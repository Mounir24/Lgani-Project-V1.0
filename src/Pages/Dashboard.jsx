import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <main className="lgani-dashboard-container">
      <div className="w-100 p-0 m-0">
        <div className="row">
          {/*--- SIDEBAR SECTION ---*/}
          <div className="col-md-2 col-sm-2 col-2">
            <div className="dash-sidebar-wrapper">
              <ul className="sidebar-menu-list">
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-home-alt-2"></i>
                    <Link className="menu-link-label" to="/dashboard/home">
                      Dashboard
                    </Link>
                  </div>
                </li>
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-message-square-add"></i>
                    <Link className="menu-link-label" to="create">
                      Create
                    </Link>
                  </div>
                </li>
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-qr-scan"></i>
                    <Link className="menu-link-label" to="qrtags-manager">
                      QR Tags
                    </Link>
                  </div>
                </li>
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-user-circle"></i>
                    <Link className="menu-link-label" to="profile">
                      Profile
                    </Link>
                  </div>
                </li>
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-cog"></i>
                    <Link className="menu-link-label" to="settings">
                      Settings
                    </Link>
                  </div>
                </li>
                <li className="item-list">
                  <div className="menu-link-wrapper">
                    <i class="bx bx-log-out"></i>
                    <span className="menu-link-label">Log out</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/*--- DASHBOAD MAIN SECTION ---*/}
          <div className="col-md-10 col-sm-10 col-10">
            <div className="p-0 m-0">
              <div className="dashboard-main-control-wrapper">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
