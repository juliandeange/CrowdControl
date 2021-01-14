import React from 'react'

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

            expiry: "",
            isValid: true

        }
    }

    createButtonClicked() {


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
                            label="Expiry Day"
                            type="date"
                            // defaultValue="2017-05-24"
                            defaultValue={new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate()}
                            style={styles.componentDimensions}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Expiry Time"
                            type="time"
                            defaultValue="23:59"
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