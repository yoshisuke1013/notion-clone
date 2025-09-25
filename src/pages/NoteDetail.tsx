import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { useNoteStore } from "@/modules/notes/note.state";
import { noteRepository } from "@/modules/notes/note.repository";
import { TitleInput } from "@/components/Toolbar";

const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id);

  const fetchOne = async () => {
    try {
      setIsLoading(true);
      const note = await noteRepository.findOne(currentUser!.id, id);
      if (note == null) return;
      noteStore.set([note]);
    } catch (error) {
      console.error("ノートの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOne();
  }, [id]);

  if (isLoading) return <div>Loading…</div>;
  if (note == null) return <div>note is not existed</div>;

  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput initialData={note} />
      </div>
    </div>
  );
};

export default NoteDetail;
