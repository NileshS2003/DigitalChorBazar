import { ErrorPayloadType } from "../../interfaces/error.interface.ts";
import { IListingData, IListing } from "../../interfaces/listing.interface.ts";

export function createListing(listingData: IListingData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(listingData),
      });
      if (response.ok) {
        const data = await response.json();
        resolve(data as IListing);
      } else {
        const err = await response.json();
        console.log(err);
        reject({err: err as ErrorPayloadType });
      }
    } catch (err) {
      reject({err: err as ErrorPayloadType});
    }
  });
}
//   const res = await fetch(`/api/listing/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(mahiti),
//   });
//   const doc = await res.json();
//   console.log(doc);
//   // navigate(`/your-listing/${doc._id}`);
// } catch (err) {
//   console.log(err);
