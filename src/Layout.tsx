import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { useNoteStore } from "./modules/notes/note.state";
import { noteRepository } from "./modules/notes/note.repository";
import SideBar from "./components/SideBar";
import { SearchModal } from "./components/SearchModal";

const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const notes = await noteRepository.find(currentUser!.id);
      if (notes == null) return;
      noteStore.set(notes);
    } catch (error) {
      console.error("ノートの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (currentUser == null) return <Navigate replace to="/signin" />;

  return (
    <div className="h-full flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => {}} />}
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
