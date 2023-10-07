import supabase, { supabaseUrl } from "./supabase";

export async function userSignup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  // 1. Update Password Or Full Name
  if (password) updateData = supabase.auth.updateUser({ password });
  if (fullName) updateData = supabase.auth.updateUser({ data: { fullName } });
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload avatar image
  const avatarName = `mobin-${crypto.randomUUID()}`;

  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (avatarUploadError) throw new Error(avatarUploadError.message);

  // 3. Update Avatar in the user
  const { data: updateUser, error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updateUser;
}
