import React from 'react'
import firebase from 'firebase'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const CollectionName = "Stores"

const styles = {

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

}

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {

            storeName: "",
            storeCode: "",
            storeCapacity: "",
            expiryDay: "",
            currentDate: "",

            storeNameValid: true,
            storeCodeValid: true,
            storeCapacityValid: true,
            storeExpiryDayValid: true,

        }
    }

    componentDidMount() {

        var currentDate = new Date();
        // eslint-disable-next-line

        var year = currentDate.getFullYear()
        var month = currentDate.getMonth() + 1
        var date = currentDate.getDate()

        var dateStr = year + "-" + (month <= 9 ? '0' + month : month) + '-' + (date <= 9 ? '0' + date : date)

        this.setState({ expiryDay:  dateStr, currentDate: currentDate })

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

        if (this.state.expiryDay < this.state.currentDate){
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
                    this.props.invokeSnackbar("Store " + this.state.storeName + " (" + this.state.storeCode + ") has been created", "success")
                    this.props.invokeStoreCreated(this.state.storeCode)

                } 
                });
            }
        }
        else {

            this.props.invokeSnackbar("There are one or more errors", "error")

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
                            error={!this.state.storeExpiryDayValid}
                            value={this.state.expiryDay}
                            onChange={this.handleChange}
                            style={styles.componentDimensions}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.componentDimensionsPurple}
                            onClick={this.createButtonClicked.bind(this)}>
                            <span style={styles.styleWhite}>Create</span>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Create