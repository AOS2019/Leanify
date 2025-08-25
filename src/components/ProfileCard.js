import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAvatarColor } from "../utils/getAvatarColor";


// Helper: compress image into thumbnail
const createThumbnail = (file, maxSize = 128) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], "thumbnail.jpg", { type: "image/jpeg" }));
          } else {
            reject(new Error("Thumbnail creation failed"));
          }
        },
        "image/jpeg",
        0.8
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ProfileCard({ userData, setUserData }) {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(userData?.name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleSave = async () => {
    try {
      let photoURL = userData?.photoURL || "";
      let thumbURL = userData?.thumbURL || "";

      // Upload avatar if selected
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, avatarFile);
        photoURL = await getDownloadURL(storageRef);

      // Create & upload thumbnail
        const thumbFile = await createThumbnail(avatarFile);
        const thumbRef = ref(storage, `avatars/${auth.currentUser.uid}/thumb.jpg`);
        await uploadBytes(thumbRef, thumbFile);
        thumbURL = await getDownloadURL(thumbRef);
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL,
      });

      // Update Firestore
      const refDoc = doc(db, "users", auth.currentUser.uid);
      await updateDoc(refDoc, {
        name: newName,
        photoURL,
      });

      // update Local state
      setUserData((prev) => ({ ...prev, name: newName, photoURL }));
      setShowModal(false);
      setAvatarFile(null);
      setPreviewURL(null);
      if (auth.currentUser) {
        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
          photoURL: userData.photoURL || null,
        });

        // Update Firestore user document
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: userData.name,
          photoURL: userData.photoURL || null,
        });
      }
      // setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  // Update Avatar
  const handleFileChange = (file) => {
    if (file) {
      setAvatarFile(file);
      setPreviewURL(URL.createObjectURL(file)); // show preview instantly
    }
  };

  // get initials
  const getInitials = (name= "") => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        {userData?.thumbURL || userData?.photoURL ? (
          <img
            src={userData.thumbURL || userData.photoURL}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.style.display = "none"; // hide broken image
              const fallback = document.createElement("div");
              fallback.className =
                "w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 text-xl font-bold";
              fallback.innerText = getInitials(userData?.name);
              e.target.parentNode.appendChild(fallback);
            }}
          />
        ) : (
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-full text-xl font-bold ${getAvatarColor(
              userData?.name
            )}`}
          >
            {getInitials(userData?.name)}
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
        <p><strong>Name:</strong> {userData?.name}</p>
        <p><strong>Email:</strong> {auth.currentUser?.email}</p>
        <p><strong>Role:</strong> {userData?.role}</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            
            {/* Name input */}
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-3"
              placeholder="Enter new name"
            />

            {/* Drag and drop upload */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileChange(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
              onClick={() => document.getElementById("avatarInput").click()}
            >
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="mx-auto w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <p className="text-gray-500">Drag & drop an image, or click to select</p>
              )}

              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setAvatarFile(null);
                  setPreviewURL(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
