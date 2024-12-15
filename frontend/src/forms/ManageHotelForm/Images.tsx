import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

const ImagesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>(); 

  const existingImageUrls = watch("imageUrls");
  console.log(existingImageUrls);
 
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
       )}
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          className="w-full text-gray-700 font-normal"
          accept="images/*"
          multiple
          {...register("imageFiles", {
            validate: (imageFile) => {
              const totalLength = imageFile.length;
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6 pictures";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};

export default ImagesSection;
