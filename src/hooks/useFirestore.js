import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, orderBy, query, onSnapshot, where } from "firebase/firestore";

export const useFirestore = (coll, condition) => {
    // React: Get to firebase
    const [documents, setDocuments] = useState([]);
    React.useEffect(() => {
        let collectionRef = query(collection(db, coll), orderBy('createdAt'));
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });
        return unsubscribe;
    }, [coll, condition]);
    return documents;
};

export default useFirestore;