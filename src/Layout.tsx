import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import SideBar from "./components/SideBar";
import { SearchModal } from "./components/SearchModal";

const Layout = () => {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) return <Navigate replace to="/signin" />;

  return (
    <div className="h-full flex">
      <SideBar onSearchButtonClicked={() => {}} />
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => {}}
        />
      </main>
    </div>
  );
};

export default Layout;
