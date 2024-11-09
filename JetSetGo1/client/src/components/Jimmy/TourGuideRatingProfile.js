import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Box,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import RadioGroupRating from "./RadioGroupRating"; // Assuming this is your custom rating component
import "./TourGuideRatingProfile.css";

function TourGuideRatingProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourGuide, setTourGuide] = useState(null);
  const [comments, setComments] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const touristId = "670670e70c449b57490188b7";

  useEffect(() => {
    fetch(`http://localhost:8000/api/tour-guides/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTourGuide(data);
        setComments(data.comments || []);
        if (
          data.ratings &&
          data.ratings.some((rating) => rating.tourist === touristId)
        ) {
          setHasRated(true);
        } else {
          setHasRated(false);
        }
      })
      .catch((error) =>
        console.error("Error fetching tour guide details:", error)
      );
  }, [id, touristId]);

  const calculateAverageRating = () => {
    if (tourGuide && tourGuide.ratings && tourGuide.ratings.length > 0) {
      const total = tourGuide.ratings.reduce((sum, r) => sum + r.rating, 0);
      return (total / tourGuide.ratings.length).toFixed(1);
    }
    return "No ratings yet";
  };

  const handleRatingSubmit = () => {
    if (hasRated || !newRating) return;
    const ratingData = {
      touristId,
      tourGuideId: id,
      rating: newRating,
    };

    fetch(`http://localhost:8000/api/tourist/addRating`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error submitting rating:", data.error);
        } else {
          setTourGuide((prev) => ({
            ...prev,
            ratings: [...(prev?.ratings || []), data],
          }));
          setNewRating(0);
          setHasRated(true);
        }
      })
      .catch((error) => console.error("Error submitting rating:", error));
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const commentData = {
      touristId,
      tourGuideId: id,
      comment: newComment,
    };

    fetch(`http://localhost:8000/api/tourist/addComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setComments((prevComments) => [...prevComments, newComment]);
          setNewComment("");
        } else {
          console.error("Error submitting comment:", data.error);
        }
      })
      .catch((error) => console.error("Error submitting comment:", error));
  };

  return tourGuide ? (
    <Box sx={{ padding: 3 }}>
      <IconButton onClick={() => navigate(-1)} className="back-button">
        &lt; Back
      </IconButton>
      <Typography variant="h4" component="h1">
        {tourGuide.username}
      </Typography>
      <Typography variant="subtitle1">
        Rating: {calculateAverageRating()}/5
        <RadioGroupRating value={calculateAverageRating()} disabled={0} />
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">Add a Rating</Typography>
        <RadioGroupRating
          value={newRating}
          onChange={(e, newValue) => setNewRating(newValue)}
          disabled={hasRated}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRatingSubmit}
          disabled={hasRated}
          sx={{ mt: 1 }}
        >
          {hasRated ? "Rating Submitted" : "Submit Rating"}
        </Button>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">Add a Comment</Typography>
        <TextField
          fullWidth
          multiline
          rows={1} // Adjusted for more space
          variant="outlined"
          value={newComment}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              setNewComment(e.target.value);
            }
          }}
          placeholder="Leave a comment (max 250 characters)"
          sx={{ my: 1 }}
        />
        <Typography variant="body2" color="textSecondary">
          {250 - newComment.length} characters remaining
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ mt: 1 }}
        >
          Submit Comment
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
        <Typography variant="h6" sx={{ width: "100%" }}>
          Comments:
        </Typography>

        {comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "48%", md: "32%" },
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1">
              {comment.length > 250
                ? `${comment.substring(0, 250)}...`
                : comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <CircularProgress />
  );
}

export default TourGuideRatingProfile;
