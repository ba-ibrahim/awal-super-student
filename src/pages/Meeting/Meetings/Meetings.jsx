import { useState, useEffect } from "react";
import axios from "axios";
import Meet from "../Meet/Meet";
import './Meetings.css';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Meetings() {
    const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/meetings`);
                setMeetingsData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch meetings. Please try again.");
                setLoading(false);
                console.error(error);
            }
        };

        fetchMeetings();
    }, [meetingsData]);

    const handleEdit = (id) => {
        console.log(`Edit meeting with ID: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/v1/meetings/${id}`);
            setMeetingsData(meetingsData.filter((meeting) => meeting._id !== id));
        } catch (error) {
            setError("Failed to delete the meeting. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="meetings">
            {loading && <div>Loading meetings...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <div className="meetings-list">
                    {meetingsData.map((meeting) => (
                        <Meet
                            key={meeting._id}
                            title={meeting.title}
                            description={meeting.description}
                            date={meeting.meetDate}
                            time={meeting.meetTime}
                            onEdit={() => handleEdit(meeting._id)}
                            onDelete={() => handleDelete(meeting._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
