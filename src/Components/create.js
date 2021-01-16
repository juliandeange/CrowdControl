import React from 'react'
import firebase from 'firebase'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            expiryTime: "23:59",

            storeNameValid: true,
            storeCodeValid: true,
            storeCapacityValid: true,
            storeExpiryDayValid: true,
            storeExpiryTimeValid: true

        }
    }

    createButtonClicked() {

        // var connectedStore = firebase.firestore().collection("StoreCounts").doc(this.props.connectedTo);
        // firebase.firestore().collection("StoreCounts").doc("NEWDOC").set({
        //     field1: 1,
        //     field2: "2"
        // })

        // Check name
        // if (storeName !== "")

        // Check code

        // Check capacity

        //Check expiry Date and Time

        var test = firebase.firestore().collection("StoreCounts").doc("AAA0012").get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log("found")
            }
        });

    }

    componentDidMount() {

        var currentDate = new Date();
        var dateString = currentDate.getFullYear() + "-" + currentDate.getMonth() + 1 + "-" + currentDate.getDate() + "T" + "23:59"

        this.setState({ expiry: dateString })

    }

    handleChange(event) {

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
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Name"
                            variant="outlined"
                            value={this.state.storeName}
                            onChange={this.handleChange} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            name="storeCode"
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.handleChange} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            name="storeCapacity"
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Capacity"
                            variant="outlined"
                            type="number"
                            value={this.state.storeCapacity}
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
                            value={this.state.expiryDay}
                            onChange={this.handleChange}
                            style={styles.componentDimensions}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="expiryTime"
                            label="Expiry Time"
                            type="time"
                            // defaultValue="23:59"
                            value={this.state.expiryTime}
                            onChange={this.handleChange}
                            style={styles.componentDimensions}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
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
            </div>
        )
    }
}

export default Create