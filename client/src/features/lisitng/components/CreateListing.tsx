// import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Iuser } from "../../interfaces/user.interface";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { errorhandler } from "../../../utils";
import { RootState, useAppDispatch } from "../../../app/store";
import { createListingAsync } from "../listingSlice";

function CreateListing() {
  const { register, handleSubmit } = useForm();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  const [files, setFiles] = useState<File[]>([]);
  const [ImageUrls, setImageUrls] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filez = Array.from(e.target.files);
      setFiles(filez);
    }
  };

  const handelImageSubmit = async () => {
    setUploading(true);
    if (files.length > 0 && files.length + ImageUrls.length < 7) {
      try {
        const urls: string[] = (await Promise.all(
          files.map(storeImage)
        )) as string[];
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
        console.log(ImageUrls);
      } catch (error) {
        console.error("Error while uploading images:", error);
      }
    } else {
      console.error("Error: Invalid file count");
    }
    setUploading(false);
  };

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("progress : ", progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
              console.log(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const onSubmit = async (data: any) => {
    try {
      if (ImageUrls.length < 1)
        return (
          errorhandler(401, "You should upload at leat one image"),
          setError("You should upload at leat one image")
        );

      // This is for not taking filelist from input as it is. If not takem it will be filelist instead of updated urlstring here data is destructured as inmageurl and rest of what we want.This thing down here that is..

      const { imageUrls, ...rest } = data;
      const mahiti = {
        seller_Id: loggedInUser?._id,
        photos: ImageUrls,
        ...rest,
      };
      const result = await dispatch(createListingAsync(mahiti));
      console.log(result.payload);
      navigate(`/listing`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(ImageUrls.filter((_, i) => i !== index));

    console.log(ImageUrls);
  };

  return (
    <div className="mx-8">
      <form
        className="bg-white px-5 py-12 mt-12"
        noValidate
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Product Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Give it a try.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("title", {
                      required: "title is required",
                    })}
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  discription
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    // name="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-3 sm:flex gap-3">
                  <input
                    className="p-3 border border-gray-300 rounded w-full"
                    type="file"
                    id="images"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handelImageSubmit}
                    className="p-3 border-green-700 border text-green-700 rounded-md hover:shadow-lg mt-3 sm:mt-0"
                  >
                    {uploading === true ? `UPLOADING` : `UPLOAD`}
                  </button>
                </div>
                {ImageUrls.length > 0 &&
                  ImageUrls.map((url, index) => (
                    <div
                      key={url}
                      className="flex justify-between p-3 border items-center my-3"
                    >
                      <img
                        src={url}
                        alt="listing image"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Type
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("type", {
                      required: "type is required",
                    })}
                    id="type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Type
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("type", {
                      required: "type is required",
                    })}
                    id="type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="used_time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  How Old?
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("used_time", {
                      required: "used_time is required",
                    })}
                    id="used_time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("price", {
                      required: "price is required",
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="relative flex gap-x-3 mt-3">
              <div className="flex h-6 items-center">
                <input
                  id="isNegotialble"
                  // name="furnished"
                  {...register("isNegotialble")}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="isNegotialble"
                  className="font-medium text-gray-900"
                >
                  Offers
                </label>
                <p className="text-gray-500">Be reasonable</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to={`/profile`}>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        {
          <p className="text-sm text-red-500 items-center flex justify-end mt-3">
            {error}
          </p>
        }
      </form>
    </div>
  );
}

export default CreateListing;
