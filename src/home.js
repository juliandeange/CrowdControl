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

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CollectionName = "Stores"

var listener = {};

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
    componentDimensions: {
        width: 194,
        height: 55
    },
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: 2,
      },
      title: {
        flexGrow: 1,
      }

}

class Home extends React.Component {

    constructor(props) {

        super(props)

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

                    <div style={styles.centerPage}>
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
                        </div>
                    </div>

                    : this.state.visibleForm === "counter" ?
                        <div style={{fontWeight: "bold"}}>
                            <div style={styles.topThird}>
                                <h3>
                                    <div>
                                        {this.state.connectedName} ({this.state.connectedTo})
                                    </div>
                                    <div>
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
                            <Create invokeHomeButton={this.homeButtonClicked} invokeSnackbar={this.snackbarOpen} />   
                        </div>
                    
                    : null

                }
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