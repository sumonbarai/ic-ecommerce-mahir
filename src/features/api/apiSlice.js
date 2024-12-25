import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "products"));

          const result = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });

          return { data: result }; // must be return object
        } catch (error) {
          return { error: error.message }; // must be return object
        }
      },
      providesTags: ["products"],
    }),
  }),
});
export const { useGetAllProductsQuery } = apiSlice;
