import { toast } from "react-toastify";

export const uploadImage = async (
  imageFile: File
): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    }

    toast.error("Image upload failed");
    return undefined;
  } catch {
    toast.error("Network error");
    return undefined;
  }
};