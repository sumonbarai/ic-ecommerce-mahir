import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useReadFirebase = (collectionName) => {
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const querySnapshot = await getDocs(collection(db, collectionName));

        const result = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        setDate(result);
      } catch (e) {
        setError("something is error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
};

export default useReadFirebase;
