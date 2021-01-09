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
        this.state = {

            isValid: true

        }
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
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.componentDimensions}>
                            Create
                        </Button>
                    </Grid>

                </Grid>

            </div>
        )
    }
}

export default Create