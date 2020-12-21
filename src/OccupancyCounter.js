import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {

    submitButton: {
        
        backgroundColor: "rgb(177, 0, 231)",
        width: 194, 
        height: 55,
        marginTop: 8
    },

    // 55
    componentDimensions: {
        width: 194,
        height: 55
    }

}

class OccupancyCounter extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            isValid: true

        }
    }

    
    render() {

        document.body.classList.add("no-sroll")

        return(

            <div style={{
                // position: 'absolute', 
                // left: '50%', 
                // top: '50%', 
                // transform: 'translate(-50%, -50%)',
                // display: 'flex',
                // height: "100vh", 
                // width: "100%"
            }}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <h2 style={{textAlign: "center"}}>Occupancy Counter</h2>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            defaultValue="ABC123"
                            variant="outlined"
                        /> 
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                    <Button   
                        style={styles.submitButton}
                        variant="contained"
                        size="large">
                        Submit
                    </Button>
                    </Grid>


                </Grid>

     
                {/* <div> */}
                    {/* <h2 className="Label-text"> Enter Store Code: &nbsp;&nbsp;  */}
                    {/* <TextField
                        style={styles.componentDimensions}
                        error={!this.state.isValid}
                        id="outlined-error"
                        label="Enter Store Code"
                        defaultValue="ABC123"
                        variant="outlined"
                    /> 
                </div>
                <div>
                    <Button   
                        style={styles.submitButton}
                        variant="contained"
                        size="large">
                        Submit
                    </Button>
                </div> */}
            </div>
        )
    }
}

export default OccupancyCounter;