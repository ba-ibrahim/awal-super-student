

import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import "./CreateBlog.css";
import axios from "axios";

export default function CreateBlog() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, thumbnail: e.target.files[0] });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('tags', formData.tags);
        formDataToSend.append('thumbnail', formData.thumbnail); // Append file

        try {
            const response = await axios.post('/api/blog/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Blog Created:', response.data);
            handleClose();
        } catch (err) {
            console.error('Error creating blog:', err.response?.data || err.message);
        }
    };

    

    return (
        <div className="create-blog">
            <button onClick={handleOpen} className="blog-post-create-button">Create Blog</button>
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
                        Create a Blog
                    </Typography>
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
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={6}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Tags (comma-separated)"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <input
                            accept="image/*"
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Create
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

