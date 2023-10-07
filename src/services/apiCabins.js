import supabase, { supabaseUrl } from "./supabase";

// Read All The Cabin Data
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabin Could No Be Found");
  }

  return data;
}

// Create A Cabin
export async function editCreateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${newCabin.image?.name
    ?.toLowerCase?.()
    .replaceAll("/", "-")}-MOBIN-${crypto.randomUUID()}`;

  const imageURL = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 1. creating cabin
  if (!id) query = query.insert([{ ...newCabin, image: imageURL }]).select();

  // 2. editing cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imageURL })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin Could No Be Created");
  }

  if (hasImagePath) return data;

  // 3. upload image on the cabins-bucket
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    throw new Error("Cabin Image Is Not Be Uploaded And Cabin Is Not Created");
  }

  return data;
}

// Delete A Cabin
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin Could No Be Found");
  }
}
