import { supabase } from "@/lib/supabase";

export const noteRepository = {
  async find(userId: string, parentDocumentId?: number) {
    const { data } =
      parentDocumentId != null
        ? await supabase
            .from("notes")
            .select()
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .eq("parent_document", parentDocumentId)
        : await supabase
            .from("notes")
            .select()
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .is("parent_document", null);

    return data;
  },

  async create(userId: string, params: { title?: string; parentId?: number }) {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          title: params.title,
          parent_document: params.parentId,
        },
      ])
      .select()
      .single();

    if (error != null) throw new Error(error?.message);

    return data;
  },

  async findOne(userId: string, id: number) {
    const { data } = await supabase
      .from("notes")
      .select()
      .eq("id", id)
      .eq("user_id", userId)
      .single();
    return data;
  },
};
