import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, Button, Input, Typography } from '@mui/material';
import "./Profil.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Profil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [openModal, setOpenModal] = useState(false); // For controlling the modal state
  const [imageFile, setImageFile] = useState(null); // Store selected image file

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await localStorage.getItem("authToken");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/v1/user/getUserById`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setUpdatedProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = async () => {
    const token = await localStorage.getItem("authToken");
    try {
      await axios.put(`${apiUrl}/api/v1/user/updateUser`, updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    
    setImageFile(e.target.files[0]);
  };

  const handleProfilePictureUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file); 
    const authToken = await localStorage.getItem("authToken"); 
    try {
        // Make PUT request to the backend to update profile picture
        const response = await axios.put(`${apiUrl}/api/v1/user/updateProfilePicture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`, // Attach auth token (if using JWT)
            },
        });
        console.log("Profile picture updated:", response.data);
    } catch (error) {
        console.error("Error uploading profile picture:", error);
    }
};

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profil">
      <div className="profil-image">
        <img
          src={profile.profilePicture || "https://i.pravatar.cc/300"}
          alt="profile"
        />
        <div className="edit-button">
          <button onClick={() => setOpenModal(true)}>Edit profile picture</button>
        </div>
      </div>
      <div className="profil-info">
        {[{ label: "First name", name: "firstName" }, { label: "Last name", name: "lastName" }, { label: "Email", name: "email", type: "email" }, { label: "Domain", name: "field" }, { label: "Field", name: "sub_field" }, { label: "Year", name: "year" }].map(({ label, name, type = "text" }) => (
          <div className="info-row" key={name}>
            <label htmlFor={name} className="info-label">
              {label}:
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={updatedProfile[name] || ""}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="info-input"
            />
          </div>
        ))}
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          ) : (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Modal for Profile Picture Edit */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            width: "400px", // You can adjust the modal width
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Upload New Profile Picture</Typography>
          <Input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="image-input"
          />
          <div>
            <Button onClick={handleProfilePictureUpload} variant="contained" color="primary" sx={{ mt: 2 }}>
              Upload
            </Button>
            <Button
              onClick={() => setOpenModal(false)}
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
