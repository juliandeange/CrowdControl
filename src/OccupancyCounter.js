import React from 'react'
import firebase from 'firebase'
import "./firestore"

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ImportContacts from '@material-ui/icons/ImportContacts'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

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
    }

}

class OccupancyCounter extends React.Component {

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

            navValue: ""

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

    }

    upArrowClicked() {

        var connectedStore = firebase.firestore().collection("StoreCounts").doc(this.state.connectedTo);

        return connectedStore.update({
            count: firebase.firestore.FieldValue.increment(1)
        })

    }

    downArrowClicked() {

        var connectedStore = firebase.firestore().collection("StoreCounts").doc(this.state.connectedTo);

        return connectedStore.update({
            count: firebase.firestore.FieldValue.increment(-1)
        })

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

    NavChange = (e) => {

        console.log(e)

    }
    
    render() {

        document.body.classList.add("no-sroll")
        document.body.classList.add("background-red");

        return(


            <div>
                    
                {/* // position: 'absolute', 
                // left: '50%', 
                // top: '50%', 
                // transform: 'translate(-50%, -50%)',
                // display: 'flex',
                // height: "100vh", 
                // width: "100%" */}

                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <h2 style={{textAlign: "center"}}>Occupancy Counter</h2>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            // helperText={this.state.isValid ? "" : "Invalid Store Code"}
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        /> 
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Button   
                            color="primary"
                            style={styles.submitButton}
                            variant="contained"
                            size="large"
                            onClick={this.createButtonClicked.bind(this)}>
                            Create
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Button   
                            color="primary"
                            style={styles.submitButton}
                            variant="contained"
                            size="large"
                            onClick={this.connectButtonClicked.bind(this)}>
                            Connect
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            color="secondary"
                            style={styles.submitButton}
                            variant="contained"
                            size="large"
                            onClick={this.disconnectButtonClicked.bind(this)}>
                            Disconnect
                        </Button>
                    </Grid>

                    <Grid item xs={12} style={{textAlign: "center"}}>

                        <IconButton onClick={this.upArrowClicked.bind(this)}>
                            <KeyboardArrowUpIcon style={styles.arrowSize}/>
                        </IconButton>
                        <h1>
                            {this.state.count}
                        </h1>
                        <IconButton onClick={this.downArrowClicked.bind(this)}>
                            <KeyboardArrowDownIcon style={styles.arrowSize} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.snackbarClose.bind(this)}>
                    <Alert onClose={this.snackbarClose.bind(this)} severity={this.state.snackSeverity}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>

                {/* <BottomNavigation 
                style={{    width: '100%',
                position: 'fixed',
                bottom: 0,}}
                    value={this.state.navValue} 
                    // onChange={(event, newValue) => {setValue(newValue); }}
                    onChange={this.NavChange}
                    showLabels
                    // className={classes.root}
                    >
                    <BottomNavigationAction label="ImportContacts" icon={<ImportContacts />} />
                    <BottomNavigationAction label="ImportContacts" icon={<ImportContacts />} />
                </BottomNavigation> */}

            </div>
        )
    }
}

export default OccupancyCounter;