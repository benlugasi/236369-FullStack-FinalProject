import React from 'react';
import '../../../App.css';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FaGithub } from "react-icons/fa";
import { Button } from "@mui/material"

const useStyles = makeStyles((theme: Theme) => createStyles({
    body: {
        color: '#272e5d',
        fontSize: 24,
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    button: {
        borderRadius: 15,
        display:"block",
        float:"left",
        margin:"0 7px 0 0",
        color:"#f5f5f5",
        borderTop: "1px solid #eee",
        borderLeft:"1px solid #eee",
        fontFamily:"Lucida Grande, Tahoma, Arial, Verdana, sans-serif",
        fontSize: "100%",
        lineHeight: "130%",
        textDecoration: "none",
        fontWeight: "bold",
        backgroundColor: "#565656",
        cursor: "pointer",
        padding: "5px 10px 6px 7px"
    }
}))


export const About = () => {
    const classes = useStyles();
    return (
        <div className="Page" >
            <h1> Polling System </h1>
            <h2> 236369 Managing Data on The World-Wide Web Final Project </h2>
            <h3> Submitters: Ofir Shechtman & Ben Lugasi </h3>
            <body>
                <p className={classes.body}>
                This is the admin poll managing system,<br/>
                here you can Add, Delete and Review your Telegram poll results.<br/>
                register our bot by starting a conversation with @FullStackBenOfirBot<br/>
                for more information, see:
                </p>
                <Button className={classes.button}
                        size="large"
                        href="https://github.com/Ofir-Shechtman/236369-FullStack-FinalProject">
                  <FaGithub />
                    <span> Github</span><br/>
                </Button>
            </body>
        </div>
    )
}