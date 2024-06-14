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
import { errorhandler } from "../../utils";
import { RootState } from "../../app/store";
// import errorhandler from "../utils";

function CreateListing() {
  const { register, handleSubmit } = useForm();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  const [files, setFiles] = useState<File[]>([]);
  const [ImageUrls, setImageUrls] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [offer, setOffer] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const filez = Array.from(e.target.files as File[]);
    setFiles(filez);
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

      // This is for not taking filelist from input as it is. If not takem it will be filelist instead of updated urlstring here data is destructured as inmageurl and rest of what we want.
      const { imageUrls, regularPrice, discountedPrice, ...rest } = data;
      if (discountedPrice > regularPrice) {
        return (
          errorhandler(
            401,
            "Regular Price should be more than discounted Price"
          ),
          setError("Regular Price should be more than discounted Price")
        );
      }
      const mahiti = {
        userRef: loggedInUser?._id,
        imageUrls: ImageUrls,
        regularPrice: regularPrice,
        discountedPrice,
        ...rest,
      };
      console.log(mahiti);
      const res = await fetch(`/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mahiti),
      });
      const doc = await res.json();
      console.log(doc);
      navigate(`/your-listing/${doc._id}`);
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
              Owner Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name", {
                      required: "name is required",
                    })}
                    name="name"
                    id="name"
                    autoComplete="name"
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
                    onInput={(e) => handleFileChange(e)}
                    {...register("imageUrls", { required: true })}
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

              <div className="col-span-full">
                <label
                  htmlFor="addresses"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("address", {
                      required: "addresses is required",
                    })}
                    id="addresses"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city", {
                      required: "city name is required",
                    })}
                    id="city"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("state", {
                      required: "state is required",
                    })}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("pinCode", {
                      required: "pinCode is required",
                    })}
                    id="pinCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 grid sm:grid-cols-2 gap-4">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Important Details
                </legend>
                <div className="mt-6 space-y-6 flex-row">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="sell"
                        // name="sell"
                        value={`sell`}
                        {...register("type")}
                        type="radio"
                        // checked={type}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="sell"
                        className="font-medium text-gray-900"
                      >
                        Sell
                      </label>
                      <p className="text-gray-500">DO Put Best Pricing</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="rent"
                        // name="rent"
                        {...register("type")}
                        type="radio"
                        value={`rent`}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="rent"
                        className="font-medium text-gray-900"
                      >
                        Rent
                      </label>
                      <p className="text-gray-500">Be reasonable</p>
                    </div>
                  </div>

                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="parking"
                        // name="parking"
                        {...register("parking")}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="parking"
                        className="font-medium text-gray-900"
                      >
                        Parking Spot
                      </label>
                      <p className="text-gray-500">Be reasonable</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="furnished"
                        // name="furnished"
                        {...register("furnished")}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="furnished"
                        className="font-medium text-gray-900"
                      >
                        Furnished
                      </label>
                      <p className="text-gray-500">Be reasonable</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offer"
                        // name="offer"
                        {...register("offer")}
                        onChange={() => setOffer(!offer)}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offer"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mt-10 space-y-10">
              <div className="sm:col-span-2 sm:flex items-center mt-3">
                <label
                  htmlFor="bedrooms"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Bedrooms
                </label>
                <div>
                  <input
                    type="number"
                    {...register("bedrooms", {
                      required: "bedrooms is required",
                    })}
                    id="bedrooms"
                    className="block w-14 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-3 no-spinner"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:flex items-center mt-3">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Baths
                </label>
                <div>
                  <input
                    type="number"
                    {...register("bathrooms", {
                      required: "baths is required",
                    })}
                    id="bathrooms"
                    className="block w-14 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-3 no-spinner  "
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:flex items-center mt-3">
                <label
                  htmlFor="regularPrice"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Regular Price
                </label>
                <div>
                  <input
                    type="number"
                    {...register("regularPrice", {
                      required: "regularPrice is required",
                    })}
                    id="regularPrice"
                    className="block w-14 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-3 no-spinner"
                  />
                </div>
                <p className="text-gray-500 ml-3">Be reasonable</p>
              </div>
              {offer && (
                <div className="sm:col-span-2 sm:flex items-center mt-3">
                  <label
                    htmlFor="discountedPrice"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Discounted Price
                  </label>
                  <div>
                    <input
                      type="number"
                      step="1"
                      pattern="\d*"
                      {...register("discountedPrice", {
                        required: "discountedPrice is required",
                      })}
                      id="discountedPrice"
                      className="block w-14 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-3 appearance-none no-spinner"
                    />
                  </div>
                  <p className="text-gray-500 ml-3">Be reasonable</p>
                </div>
              )}
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
