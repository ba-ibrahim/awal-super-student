import "./Meet.css";

export default function Meet({ title, description, date, time, onEdit, onDelete }) {
    const truncatedDescription = description.length > 50 
        ? description.substring(0, 50) + "..." 
        : description;

    return (
        <div className="meet-card">
            <div className="details">
                <p className="title">{title}</p>
                <p className="description">{truncatedDescription}</p>
                <p className="date">{date} - {time}</p>
                <div className="buttons">
                    <button onClick={onEdit} className="edit-btn">Edit</button>
                    <button onClick={onDelete} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
}
