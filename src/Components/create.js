import React from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const styles = {

    componentDimensions: {
        width: 194,
        height: 55
    }

}

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

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
    
    render() {

        return (
            <div style={{padding: 10}}>

                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Name"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Capacity"
                            variant="outlined"
                            type="number"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            id="datetime-local"
                            label="Expiry"
                            type="datetime-local"
                            // defaultValue={this.state.expiry}
                            defaultValue={new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate() + "T" + "23:59"}
                            // defaultValue="2021-01-10T23:59"
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