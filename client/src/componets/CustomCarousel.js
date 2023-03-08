import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "content-height",
    marginTop: "20px",
    position: "relative",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: "1",
  },
  leftArrow: {
    left: "0",
  },
  rightArrow: {
    right: "0",
  },
  carousel: {
    display: "flex",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
  },
  slide: {
    flex: "0 0 100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 40px",
    boxSizing: "border-box",
    textAlign: "center",
  },
});

function CustomCarousel({ jobs }) {
  const classes = useStyles();
  const [currentJob, setCurrentJob] = useState(0);

  const handlePrevClick = () => {
    setCurrentJob((currentJob - 1 + jobs.length) % jobs.length);
  };

  const handleNextClick = () => {
    setCurrentJob((currentJob + 1) % jobs.length);
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={`${classes.arrow} ${classes.leftArrow}`}
        onClick={handlePrevClick}
      >
        <ChevronLeft />
      </IconButton>
      <div
        className={classes.carousel}
        style={{ transform: `translateX(-${currentJob * 100}%)` }}
      >
        {jobs.map((job, index) => (
          <div key={index} className={classes.slide}>
            <Typography>{job.title}</Typography>
            <Typography>{job.description}</Typography>
            <Button>APPLY</Button>
          </div>
        ))}
      </div>
      <IconButton
        className={`${classes.arrow} ${classes.rightArrow}`}
        onClick={handleNextClick}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
}

export default CustomCarousel;
