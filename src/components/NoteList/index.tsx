import { cn } from "@/lib/utils";
import { useNoteStore } from "../../modules/notes/note.state";
import { NoteItem } from "./NoteItem";

interface NoteListProps {
  layer?: number;
  parentId?: number;
}

export function NoteList({ layer = 0, parentId }: NoteListProps) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  return (
    <>
      <p
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          layer === 0 && "hidden"
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
      >
        ページがありません
      </p>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <NoteItem note={note} layer={layer} />
          </div>
        );
      })}
    </>
  );
}
