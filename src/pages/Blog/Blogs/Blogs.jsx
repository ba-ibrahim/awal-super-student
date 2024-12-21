import { useState } from "react";
import "./Blogs.css";

export default function Blogs() {
    const sampleBlogs = [
        {
            id: 1,
            author: "John Doe",
            image: "https://via.placeholder.com/150",
            title: "The Beauty of Nature",
            content:
                "Nature is beautiful and inspiring. This blog explores the wonders of the natural world, from the majestic mountains to the serene forests...",
        },
        {
            id: 2,
            author: "Jane Smith",
            image: "https://via.placeholder.com/150",
            title: "Tech Trends 2024",
            content:
                "The tech industry is evolving at an unprecedented pace. In this blog, we dive into the latest trends and innovations shaping the future...",
        },
        {
            id: 3,
            author: "Alex Johnson",
            image: "https://via.placeholder.com/150",
            title: "Mindfulness in Daily Life",
            content:
                "Mindfulness is a powerful tool for maintaining mental clarity and balance. Learn how to incorporate mindfulness into your everyday routine...",
        },
    ];

    const [showMore, setShowMore] = useState({});

    const handleShowMore = (id) => {
        setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="blogs-container">
            {sampleBlogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                    <img src={blog.image} alt={blog.title} className="blog-image" />
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-author">by {blog.author}</p>
                    <p className="blog-content">
                        {showMore[blog.id]
                            ? blog.content
                            : `${blog.content.slice(0, 100)}...`}
                    </p>
                    <button
                        className="show-more-button"
                        onClick={() => handleShowMore(blog.id)}
                    >
                        {showMore[blog.id] ? "Show Less" : "Show More"}
                    </button>
                </div>
            ))}
        </div>
    );
}
