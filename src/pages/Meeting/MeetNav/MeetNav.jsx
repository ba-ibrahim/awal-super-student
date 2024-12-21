import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import "./MeetNav.css";

// Assuming you have a .env file with the API URL
const apiUrl = import.meta.env.VITE_API_URL;

export default function MeetNav() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 
        console.log(formData);
        

        try {
            const response = await axios.post(`${apiUrl}/api/v1/meetings`, formData);
            console.log("Meeting Created:", response.data);
            setLoading(false);
            handleClose(); 
        } catch (err) {
            setLoading(false);
            setError("Failed to create the meeting. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="meet-nav">
            <button onClick={handleOpen}>Create Zoom Meeting</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: 400,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Create a Zoom Meeting
                    </Typography>
                    {/* Display error message */}
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            margin="normal"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Time"
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? "Creating..." : "Create"}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
