import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {

    submitButton: {
        
        backgroundColor: "rgb(177, 0, 231)",
        width: 194, 
        marginTop: 8
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

        return(

            <div className="App" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <div>
                    {/* <h2 className="Label-text"> Enter Store Code: &nbsp;&nbsp;  */}
                    <TextField
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
                {/* </h2> */}
                </div>
            </div>
        )
    }
}

export default OccupancyCounter;