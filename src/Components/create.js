import React from 'react'
import firebase from 'firebase'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CollectionName = "Stores"

const styles = {

    componentDimensions: {
        width: 194,
        height: 55
    }

}

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {

            storeName: "",
            storeCode: "",
            storeCapacity: "",
            expiryDay: new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate(),

            storeNameValid: true,
            storeCodeValid: true,
            storeCapacityValid: true,
            storeExpiryDayValid: true,

            snackOpen: false,
            snackSeverity: "",
            snackMessage: "",

        }
    }

    createButtonClicked() {

        var name = true
        var code = true
        var capacity = true
        var expiry = true

        // Check name
        if (this.state.storeName === "")
            name = false

        // Check capacity
        if (this.state.storeCapacity <= 0)
            capacity = false

        //Check expiry Date and Time
        var dateArray = this.state.expiryDay.split("-")
        var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])

        var today = new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate()
        if (this.state.expiryDay < today){
            expiry = false
        }
        date.setHours(23)
        date.setMinutes(59)

        if (name && capacity && expiry) {

            // check if store code is valid

            if (this.state.storeCode === "")
                this.setState({ storeCodeValid: false })
            else {
                firebase.firestore().collection(CollectionName).doc(this.state.storeCode).get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        this.setState({

                            storeNameValid: name,
                            storeCodeValid: false,
                            storeCapacityValid: capacity,
                            storeExpiryDayValid: expiry,

                        })
                    }
                else {

                    // create
                    firebase.firestore().collection(CollectionName).doc(this.state.storeCode).set({

                        name: this.state.storeName,
                        capacity: parseInt(this.state.storeCapacity),
                        expiry: date,
                        count: 0

                    })

                    // Invoke fundtion to show the home page
                    this.props.action()

                } 
                });
            }
        }
        else {

            this.snackbarOpen("There are one or more errors", "error")

            this.setState({
                storeNameValid: name,
                storeCodeValid: code,
                storeCapacityValid: capacity,
                storeExpiryDayValid: expiry,
            })
        }

    }

    handleChange(event) {

        if (event.target.name === "storeCode")
            this.setState({ [event.target.name]: event.target.value.toUpperCase() })
        else
            this.setState({ [event.target.name]: event.target.value });

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
    
    componentDidMount() {

        var currentDate = new Date();
        // eslint-disable-next-line
        var dateString = currentDate.getFullYear() + "-" + currentDate.getMonth() + 1 + "-" + currentDate.getDate() + "T" + "23:59"

        this.setState({ expiry: dateString })

    }

    render() {

        return (
            <div style={{padding: 10}}>

                <Grid container spacing={1} style={{textAlign: "center"}}>

                    <Grid item xs={12}>
                        <TextField
                            name="storeName"
                            style={styles.componentDimensions}
                            error={!this.state.storeNameValid}
                            id="outlined-error"
                            label="Enter Store Name"
                            variant="outlined"
                            value={this.state.storeName}
                            onChange={this.handleChange} 
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                            name="storeCapacity"
                            style={styles.componentDimensions}
                            error={!this.state.storeCapacityValid}
                            label="Enter Store Capacity"
                            variant="outlined"
                            type="number"
                            value={this.state.storeCapacity}
                            onChange={this.handleChange} 
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                            name="storeCode"
                            style={styles.componentDimensions}
                            error={!this.state.storeCodeValid}
                            label="Enter Store Code"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.handleChange} 
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                            name="expiryDay"
                            label="Expiry Day"
                            type="date"
                            // defaultValue="2017-05-24"
                            // defaultValue={new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate()}
                            error={!this.state.storeExpiryDayValid}
                            value={this.state.expiryDay}
                            onChange={this.handleChange}
                            style={styles.componentDimensions}
                            // style={{ width: 194, height: 55}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.componentDimensions}
                            onClick={this.createButtonClicked.bind(this)}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
                {/* <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.snackbarClose.bind(this)}>
                    <Alert onClose={this.snackbarClose.bind(this)} severity={this.state.snackSeverity}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar> */}
            </div>
        )
    }
}

export default Create