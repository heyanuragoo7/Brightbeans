import { useEffect, useState } from "react";
import { apiConnector } from "./service/apiConnector";

export default function App() {
  const [products, setProducts] = useState([]);

    // Browser-native AES-GCM decryption
    async function decryptData(encryptedData, keyBase64, ivBase64, authTagBase64) {
      const key = await crypto.subtle.importKey(
        "raw",
        Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0)),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
      );

      const encryptedBytes = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
      const authTagBytes = Uint8Array.from(atob(authTagBase64), (c) => c.charCodeAt(0));
      const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));

      // Concatenate encrypted data + authTag
      const combined = new Uint8Array(encryptedBytes.length + authTagBytes.length);
      combined.set(encryptedBytes);
      combined.set(authTagBytes, encryptedBytes.length);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        combined
      );

      return JSON.parse(new TextDecoder().decode(decryptedBuffer));
    }

    const fetchProducts = async () => {
      try {
        const res = await apiConnector("GET", "http://localhost:3000/api/v1/encrypt");
        console.log("Encrypted Response:", res.data);

        const { data, key, iv, authTag } = res.data;

        const decrypted = await decryptData(data, key, iv, authTag);
        console.log("Decrypted Data:", decrypted);

        setProducts(decrypted);
      } catch (err) {
        console.error("Error fetching or decrypting:", err);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

  return (
    <div>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            {p.title} — ₹{p.price}
          </h3>
          <img src={p.images}/>
          <p>{p.description}</p>
          <small>
            Category: {p.category} | Brand: {p.brand} | Stock: {p.stock}
          </small>
          <p>{p.warrantyInformation}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}
