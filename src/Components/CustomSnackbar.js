import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class CustomSnackbar extends React.Component { 

    constructor(props) {

        super(props)
        this.state = {

            // Snackbar Properties
            shownotif: false,

        }
    }

    snackbarOpen(message, severity) {

        this.setState({ shownotif: true })
    
    }
    
    
    snackbarClose() {
        
        this.setState({ shownotif: false })
        
      };

    render() {

        const message = this.props.message
        const severity = this.props.severity
        var open = this.props.open

        return(

        <Snackbar open={open} autoHideDuration={6000} onClose={this.snackbarClose.bind(this)}>
            <Alert onClose={this.snackbarClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>

        )

    }

}

export default CustomSnackbar;