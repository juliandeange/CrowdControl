import React from 'react'
import firebase from 'firebase'
import "./firestore"
import Counter from './Components/counter'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var listener = {};

const styles = {

    submitButton: {
        
        // backgroundColor: "rgb(177, 0, 231)",
        width: 194, 
        height: 55,
        // marginTop: 8
    },

    componentDimensions: {
        width: 194,
        height: 55
    },

    arrowSize: {
        height: 50,
        width: 50
    },
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: 2,
      },
      title: {
        flexGrow: 1,
      },

}

class Home extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            storeCode: "",
            isValid: true,
            count: 0,
            connectedTo: "",

            snackOpen: false,
            snackSeverity: "",
            snackMessage: "",

        }
    }

    storeCodeChanged = (e) => {
        this.setState({ 
            storeCode:  e.target.value.toUpperCase(),
            isValid: true
        })
    }

    connectButtonClicked() {

        if (this.state.storeCode === "") {
            this.setState({ isValid: false })
            this.snackbarOpen("Enter a store code to connect to" + this.state.storeCode, "error")
            return;
        }
            
        firebase.firestore().collection("StoreCounts").doc(this.state.storeCode).get().then((query) => {

            // If connected successfully
            if (query.data() !== undefined) {

                listener = firebase.firestore().collection("StoreCounts").doc(this.state.storeCode).onSnapshot({
                    includeMetadataChanges: false
                }, 
                (doc) => {
                    this.setState({ count: doc.data().count })
                });

                this.setState({ 
                    connectedTo: this.state.storeCode,
                    count: query.data().count
                })

                this.snackbarOpen("Successfully Connected!", "success")

            }

            else {

                this.snackbarOpen("Unable to connect to: " + this.state.storeCode, "error")

                this.setState({ isValid: false })
            } 
        });   
    }

    disconnectButtonClicked() {

        listener();
        this.setState({connectedTo: ""})

        this.snackbarOpen("Disconnected from store", "info")

    }

    createButtonClicked() {


    }

    snackbarOpen(message, severity) {

        this.setState({ 
            snackOpen: true, 
            snackMessage: message, 
            snackSeverity: severity 
        })
        
    }
    
    snackbarClose() {
        
        this.setState({ 
            snackOpen: false , 
        })
        
    }
    
    render() {

        document.body.classList.add("no-sroll")
        document.body.classList.add("background-red");

        return(

            <div>

                <div style={styles.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" style={styles.title}>
                                Occupancy Counter
                            </Typography>
                            {this.state. connectedTo !== "" ? 
                            <div>
                                <Button
                                    color="secondary"
                                    // style={styles.submitButton}
                                    variant="contained"
                                    size="small"
                                    onClick={this.disconnectButtonClicked.bind(this)}>
                                    Disconnect
                                </Button>
                            </div>
                            :
                            <div>
                                <IconButton edge="end" style={styles.menuButton} color="inherit" aria-label="menu">
                                    <HomeRoundedIcon />
                                </IconButton>
                                <IconButton edge="end" style={styles.menuButton} color="inherit" aria-label="menu">
                                    <AddCircleOutlineOutlinedIcon />
                                </IconButton>
                            </div>
                            }
                        </Toolbar>
                    </AppBar>
                </div>                    

                <div style={{  position: "fixed", top: "50%", left: "50%",transform: "translate(-50%, -50%)"}}>
                    <div style={{marginBottom: "10px"}} >
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        />
                    </div>
                    <div style={{marginTop: "10px"}}>       
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={styles.componentDimensions} 
                                onClick={this.connectButtonClicked.bind(this)}>
                                Connect
                            </Button>
                            {/* <IconButton onClick={this.connectButtonClicked.bind(this)}>
                                <ForwardOutlinedIcon style={{height: 40, width: 40, marginTop: "-4px", color: "black"}}/>
                            </IconButton>  */}
    
                    </div>
                </div>
                
                {this.state.connectedTo !== "" ?
                    <Counter count={this.state.count} connectedTo={this.state.connectedTo} />
                : null }

                <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.snackbarClose.bind(this)}>
                    <Alert onClose={this.snackbarClose.bind(this)} severity={this.state.snackSeverity}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>

            </div>
        )
    }
}

export default Home