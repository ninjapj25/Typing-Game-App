import { Button, Card, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getText } from "../actions/TextActions";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [timer, setTimer] = useState(0);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const data = useSelector((state) => state.text);
    const char = document.querySelectorAll(".text");
    const corrects = document.querySelectorAll(".correct");
    const handleChange = (e) => {
        setTypedText(e.target.value);
        setIsPlaying(true);
        const textTyped = e.target.value.split("");

        char.forEach((textLetter, i) => {
            const character = textTyped[i];
            if (character == null) {
                textLetter.classList.remove("correct");
                textLetter.classList.remove("wrong");
            } else if (character === textLetter.innerText) {
                textLetter.classList.add("correct");
                textLetter.classList.remove("wrong");
            } else {
                textLetter.classList.remove("correct");
                textLetter.classList.add("wrong");
            }
        });
    };
    useEffect(() => {
        if (data) {
            setText(data.text.split(""));
            setTimer(0);
        }
    }, [data]);

    useEffect(() => {
        dispatch(getText());
    }, []);
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isPlaying]);

    useEffect(() => {
        if (corrects.length === text.length && isPlaying === true) {
            setGameOver(true);
        }
    }, [typedText]);

    useEffect(() => {
        if (gameOver) {
            const word = char.length / 4.7;
            setSpeed(Math.round((word / timer) * 60) + " Words Per Minute");
            setIsPlaying(false);
        }
    }, [gameOver]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        setOpen(true);
    }, []);

    const handlePlayAgain = () => {
        setGameOver(false);
        dispatch(getText());
        setTypedText("");
        console.log(char);
        char.forEach((textLetter, i) => {
            textLetter.classList.remove("correct");
            textLetter.classList.remove("wrong");
        });
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return (
        <Grid container={true} justifyContent="center" item={true} xs={9}>
            {!gameOver ? (
                <Grid
                    container={true}
                    justifyContent="center"
                    style={{ marginTop: "2rem" }}
                >
                    {" "}
                    <Typography
                        variant="h2"
                        component="h2"
                        style={{ color: "#ffffff" }}
                    >
                        {" "}
                        {timer}
                    </Typography>
                </Grid>
            ) : (
                <Grid
                    container={true}
                    justifyContent="center"
                    style={{ marginTop: "2rem" }}
                >
                    {" "}
                    <Typography
                        variant="h2"
                        component="h2"
                        style={{ color: "#ffffff" }}
                    >
                        {"Your speed is "}
                        {speed}
                    </Typography>
                </Grid>
            )}

            <Card style={styles.textCard}>
                {text &&
                    text.map((t, i) => (
                        <Typography
                            variant="h4"
                            component="h1"
                            key={i}
                            style={{
                                display: "inline",
                            }}
                            className="text"
                        >
                            {t}
                        </Typography>
                    ))}
            </Card>
            <Card style={styles.textCard}>
                <textarea
                    style={styles.textArea}
                    rows="5"
                    value={typedText}
                    onChange={handleChange}
                    disabled={gameOver}
                ></textarea>
            </Card>
            <Grid item={true} xs={2} style={{ marginTop: "2rem" }}>
                <Button
                    style={styles.playButton}
                    variant="contained"
                    // disabled={gameOver}
                    color={"primary"}
                    fullWidth={true}
                    onClick={handlePlayAgain}
                >
                    {isPlaying && gameOver === false
                        ? "New Words?"
                        : isPlaying === false && gameOver === false
                        ? "Play"
                        : "Play Again"}
                </Button>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                key={{ vertical: "top", horizontal: "left" }}
            >
                <Alert onClose={handleClose} severity="info">
                    Type the first letter to start playing.
                </Alert>
            </Snackbar>
        </Grid>
    );
}

const styles = {
    textCard: {
        width: "100%",
        marginTop: "2rem",
        padding: "4rem",
        minHeight: "8rem",
    },
    textArea: {
        width: "100%",
        resize: "none",
        fontSize: "1.5rem",
    },
};
