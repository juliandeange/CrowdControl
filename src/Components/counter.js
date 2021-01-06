import React from 'react'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const styles = {

    submitButton: {
        
        // backgroundColor: "rgb(177, 0, 231)",
        width: 194, 
        height: 55,
        // marginTop: 8
    },

    componentDimensions: {
        width: 194,
        height: 55
    },

    arrowSize: {
        height: 50,
        width: 50
    },
}

class Counter extends React.Component {

    upArrowClicked() {

        var connectedStore = firebase.firestore().collection("StoreCounts").doc(this.state.connectedTo);

        return connectedStore.update({
            count: firebase.firestore.FieldValue.increment(1)
        })

    }

    downArrowClicked() {

        var connectedStore = firebase.firestore().collection("StoreCounts").doc(this.state.connectedTo);

        return connectedStore.update({
            count: firebase.firestore.FieldValue.increment(-1)
        })

    }

    render() {
        return(

            <div>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <IconButton onClick={this.upArrowClicked.bind(this)}>
                        <KeyboardArrowUpIcon style={styles.arrowSize}/>
                    </IconButton>
                    <h1>
                        {this.state.count}
                    </h1>
                    <IconButton onClick={this.downArrowClicked.bind(this)}>
                        <KeyboardArrowDownIcon style={styles.arrowSize} />
                    </IconButton>
                    </Grid> 
            </div>

        )
    }

}