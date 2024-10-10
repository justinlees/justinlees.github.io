import "./App.css";
import React from "react";
import Landing from "./components/landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FsignUp, { Action as FsignUpAction } from "./components/FsignUp";
import CsignUp, { Action as CsignUpAction } from "./components/CsignUp";
import Login, { Action as loginAction } from "./components/login";
import Settings from "./components/Settings";

/*Client Imports */
import Home, { Loader as Cloader } from "./Layouts/User/home";
import MainPage from "./components/User/MainPage";
import CTasks, {
  Loader as Tloader,
  Action as TAction,
} from "./components/User/CTasks";
import MessageEntry, {
  Action as UentryAction,
} from "./components/User/MessageEntry";
import RequestPage, {
  Action as RequestAction,
} from "./components/User/RequestPage";
import MessageDisplay from "./components/User/MessageDisplay";

/* Freelancer Imports */
import FreeLance, { Loader as Floader } from "./Layouts/Freelancer/freelancer";
import FProfile from "./components/Freelancer/FProfile";
import FdashBoard from "./components/Freelancer/fDashBoard";
import FTasks, { Action as FAction } from "./components/Freelancer/FTasks";
import Earnings from "./components/Freelancer/Earnings";
import TaskInfo from "./components/Freelancer/TaskInfo";
import FMessages, {
  Action as MessageAction,
} from "./components/Freelancer/FMessages";
import FMessageDisplay from "./components/Freelancer/FMessageDisplay";

/* Admin Imports */
import Admin, { Loader as ALoader } from "./Layouts/Admin/admin";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import Profit from "./components/Admin/Profit";
import AProfile from "./components/Admin/AdminProfile";
import ManagersInfo, {
  Action as MAction,
} from "./components/Admin/ManagerInfo";

/* Manager Imports */
import Manager, { Loader as Mloader } from "./Layouts/Manager/manager";
import ManagerDashBoard from "./components/Manager/ManagerDashBoard";
import MProfile from "./components/Manager/ManagerProfile";
import MEarnings from "./components/Manager/MEarnings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signUp/freelancer",
    element: <FsignUp />,
    action: FsignUpAction,
  },
  {
    path: "/signUp/user",
    element: <CsignUp />,
    action: CsignUpAction,
  },

  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/home/:userId",
    element: <Home />,
    loader: Cloader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ":fUser/requestPage",
        element: <RequestPage />,
        action: RequestAction,
      },
      {
        path: "tasks",
        element: <CTasks />,
        loader: Tloader,
        action: TAction,
      },
      {
        path: "tasks/:fUser/messages",
        element: <MessageEntry />,
        action: UentryAction,
        children: [
          {
            index: true,
            element: <MessageDisplay />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/freelancer/:fUser",
    element: <FreeLance />,
    loader: Floader,
    children: [
      {
        index: true,
        element: <FdashBoard />,
      },
      {
        path: "profile",
        element: <FProfile />,
      },
      {
        path: "tasks",
        element: <FTasks />,
        action: FAction,
        children: [
          {
            path: "taskInfo",
            element: <TaskInfo />,
          },
        ],
      },
      {
        path: "tasks/:userId/messages",
        element: <FMessages />,
        action: MessageAction,
        children: [
          {
            index: true,
            element: <FMessageDisplay />,
          },
        ],
      },
      {
        path: "earnings",
        element: <Earnings />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/admin/:aUser",
    element: <Admin />,
    loader: ALoader,
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "profit",
        element: <Profit />,
      },
      {
        path: "managersInfo",
        element: <ManagersInfo />,
        action: MAction,
      },
      {
        path: "profile",
        element: <AProfile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/manager/:mUser",
    element: <Manager />,
    loader: Mloader,
    children: [
      {
        index: true,
        element: <ManagerDashBoard />,
      },
      {
        path: "profile",
        element: <MProfile />,
      },
      {
        path: "earnings",
        element: <MEarnings />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
