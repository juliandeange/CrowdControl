import React from 'react'
import firebase from 'firebase'
import "./firestore"
import Counter from './Components/counter'
import Create from './Components/create'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const theme = createMuiTheme({

    palette: {
        type: "dark",
        primary: {
            main: "#ffffff"
        },
        purple: {
            main: "#673ab7"
        }
    }

})

const CollectionName = "Stores"

var listener = {}

const styles = {

    centerPage: {
        position: "fixed", 
        top: "50%", 
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    topThird: {
        position: "fixed",
        top: "33%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
    bottomThird: {
        position: "fixed",
        top: "66%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
    componentDimensionsPurple: {
        width: 194,
        height: 55,
        backgroundColor: "#673ab7"
    },
    componentDimensions: {
        width: 194,
        height: 55,
    },
    styleWhite: {
        color: "white"
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
        color: "white"
    },
      title: {
        flexGrow: 1,
    }

}

class Home extends React.Component {

    constructor(props) {

        super(props)

        this.createStoreCompleted = this.createStoreCompleted.bind(this)
        this.homeButtonClicked = this.homeButtonClicked.bind(this)
        this.snackbarOpen = this.snackbarOpen.bind(this)

        this.state = {

            storeCode: "",
            isValid: true,
            count: 0,
            connectedTo: "",
            connectedName: "",
            connectedCapacity: 0,

            snackOpen: false,
            snackSeverity: "",
            snackMessage: "",

            visibleForm: "home"

        }
    }

    componentDidMount() {

        // this.deleteEntries()

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
            
        firebase.firestore().collection(CollectionName).doc(this.state.storeCode).get().then((query) => {

            // If connected successfully
            if (query.data() !== undefined) {

                listener = firebase.firestore().collection(CollectionName).doc(this.state.storeCode).onSnapshot({
                    includeMetadataChanges: false
                }, 
                (doc) => {
                    this.setState({ 
                        count: doc.data().count,
 
                    })
                });

                this.setState({ 
                    connectedTo: this.state.storeCode,
                    visibleForm: "counter",
                    count: query.data().count,
                    connectedName: query.data().name,
                    connectedCapacity: query.data().capacity
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
        this.setState({
            connectedTo: "",
            visibleForm: "home"
        })

        this.snackbarOpen("Disconnected from store", "info")

    }

    createButtonClicked() {

        this.setState({ visibleForm: "create" })

    }

    createStoreCompleted(storeCode) {

        this.setState({
            visibleForm: "home",
            storeCode: storeCode,
            isValid: true
        })

    }

    homeButtonClicked() {

        this.setState({ visibleForm: "home", isValid: true })

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
            snackOpen: false, 
        })
        
    }

    deleteEntries() {

        // Get expired stores
        firebase.firestore().collection(CollectionName).where("expiry", "<", new Date()).get()

        .then(
            function(query) {
                query.forEach(function(doc) {
                    // Delete expired stores
                    doc.ref.delete()
                });
            }
        )
    }
    
    render() {

        document.body.classList.add("no-sroll")
        document.body.classList.add("background-red");

        return(

            <MuiThemeProvider theme={theme}>
            <div>
                <div style={styles.root}>
                    <AppBar position="static" style={{backgroundColor: "#673ab7"}}>
                        <Toolbar>
                            <Typography variant="h6" style={styles.title}>
                                <span style={styles.styleWhite}>Occupancy Counter</span>
                            </Typography>

                            {this.state.connectedTo !== "" ? 

                                <div>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        onClick={this.disconnectButtonClicked.bind(this)}>
                                        Disconnect
                                    </Button>
                                </div>
                            :
                                <div>
                                    <IconButton edge="end" style={styles.menuButton} color="inherit" aria-label="menu"
                                                onClick={this.homeButtonClicked.bind(this)}>
                                        <HomeRoundedIcon />
                                    </IconButton>
                                    <IconButton edge="end" style={styles.menuButton} color="inherit" aria-label="menu"
                                                onClick={this.createButtonClicked.bind(this)}>
                                        <AddCircleOutlineOutlinedIcon />
                                    </IconButton>
                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                </div>   

                {this.state.visibleForm === "home" ?              

                    <Paper style={styles.centerPage}>
                    {/* // <div style={styles.centerPage}> */}
                        <div style={{marginBottom: "10px"}}>
                            <TextField
                                style={styles.componentDimensions}
                                // inputProps={{ style: { borderColor: 'white'}}}
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
                                style={styles.componentDimensionsPurple} 
                                onClick={this.connectButtonClicked.bind(this)}>
                                <span style={styles.styleWhite}>Connect</span>
                            </Button>    
                        </div>
                        <div style={{marginTop: "10px"}}>       
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={styles.componentDimensionsPurple} 
                                onClick={this.deleteEntries.bind(this)}>
                                <span style={styles.styleWhite}>Delete</span>
                            </Button>    
                        </div>
                    </Paper>

                : this.state.visibleForm === "counter" ?
                    <div style={{fontWeight: "bold"}}>
                        <div style={styles.topThird}>
                            <h3>
                                <div style={styles.styleWhite}>
                                    {this.state.connectedName} ({this.state.connectedTo})
                                </div>
                                <div style={styles.styleWhite}>
                                    Capacity: {this.state.connectedCapacity}
                                </div>
                            </h3>
                        </div>
                        <div style={styles.bottomThird}>
                            <Counter 
                                count={this.state.count} 
                                connectedTo={this.state.connectedTo} 
                                connectedCapacity={this.state.connectedCapacity} />
                        </div>
                    </div>

                    : this.state.visibleForm === "create" ? 
                
                        <div style={styles.centerPage}> 
                            <Create invokeStoreCreated={this.createStoreCompleted} invokeSnackbar={this.snackbarOpen} />   
                        </div>
                    
                    : null
                }
                <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.snackbarClose.bind(this)}>
                    <Alert onClose={this.snackbarClose.bind(this)} severity={this.state.snackSeverity}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>
            </div>
            </MuiThemeProvider>
        )
    }
}

export default Home