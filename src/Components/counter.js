import React from 'react'
import firebase from 'firebase'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const CollectionName = "Stores"

const styles = {
    arrowSize: {
        height: 50,
        width: 50
    },
}

class Counter extends React.Component {

    constructor(props) {

        super(props)
        this.state = {

            // count: 0,
            
        }
    }

    upArrowClicked() {

        var connectedStore = firebase.firestore().collection(CollectionName).doc(this.props.connectedTo);

        return connectedStore.update({
            count: firebase.firestore.FieldValue.increment(1)
        })

    }

    downArrowClicked() {

        var connectedStore = firebase.firestore().collection(CollectionName).doc(this.props.connectedTo);

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
                    <h1 style={{ color: this.props.count > this.props.connectedCapacity ? "red" : "lightgreen" }}>
                        {this.props.count}
                    </h1>
                    <IconButton onClick={this.downArrowClicked.bind(this)}>
                        <KeyboardArrowDownIcon style={styles.arrowSize} />
                    </IconButton>
                </Grid>             
            </div>

        )
    }

}

export default Counter