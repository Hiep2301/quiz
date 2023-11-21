import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <DiReact size={"3em"} color={"00bfff"} />
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Quiz
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<MdDashboard />}>
            <Link to={"/admin"}>Dashboard</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu icon={<FaGem />} title={"Features"}>
            <MenuItem>
              <Link to={"/admin/manage-user"}>Quản lý users</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/admin/manage-quiz"}>Quản lý bài Quiz</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/admin/manage-question"}>Quản lý câu hỏi</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default SideBar;
