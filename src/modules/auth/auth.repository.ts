import { supabase } from "@/lib/supabase";

export const authRepository = {
  async signup(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error != null || data == null) throw new Error(error?.message);

    return {
      ...data.user,
      userName: data.user?.user_metadata.name,
    };
  },
};
