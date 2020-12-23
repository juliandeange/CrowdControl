import React from 'react'
import firebase from 'firebase';

import "./firestore";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = {

    submitButton: {
        
        // backgroundColor: "rgb(177, 0, 231)",
        width: 194, 
        height: 55,
        // marginTop: 8
    },

    // 55
    componentDimensions: {
        width: 194,
        height: 55
    },

    arrowSize: {
        height: 50,
        width: 50
    }

}

function test() {

    // firebase.firestore().collection("StoreCounts").doc("AAA002").get().then((querySnapshot) => {
    //     console.log(querySnapshot.data())
    //     // querySnapshot.map((doc) => {
    //     //     console.log(`${doc.id} => ${doc.data()}`);
    //     // });
    // });

    // db.collection("StoreCounts")
    // .doc('AAA001')
    // .get()
    // .then(doc => {
    //     const data = doc.data();
    //     console.log(data); // LA city object with key-value pair
    // });

}

class OccupancyCounter extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            storeCode: "",
            isValid: true,
            count: "-"

        }
    }

    storeCodeChanged = (e) => {

        this.setState({ 
            storeCode:  e.target.value,
            isValid: true
        })

    }

    connectButtonClicked() {

        if (this.state.storeCode === "")
            return;

        firebase.firestore().collection("StoreCounts").doc(this.state.storeCode).get().then((query) => {

            if (query.data() !== undefined) {
                console.log(query.data())
            }
            else {
                this.setState({ isValid: false })
            }

            
        });
    
    }

    
    render() {

        document.body.classList.add("no-sroll")
        document.body.classList.add('background-red');

        return(

            <div>
                
                {/* // position: 'absolute', 
                // left: '50%', 
                // top: '50%', 
                // transform: 'translate(-50%, -50%)',
                // display: 'flex',
                // height: "100vh", 
                // width: "100%" */}

                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <h2 style={{textAlign: "center"}}>Occupancy Counter</h2>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <TextField
                            style={styles.componentDimensions}
                            error={!this.state.isValid}
                            id="outlined-error"
                            label="Enter Store Code"
                            helperText={this.state.isValid ? "" : "Invalid Store Code"}
                            defaultValue="ABC123"
                            variant="outlined"
                            value={this.state.storeCode}
                            onChange={this.storeCodeChanged} 
                        /> 
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Button   
                            color="primary"
                            style={styles.submitButton}
                            variant="contained"
                            size="large"
                            onClick={test}>
                            Create
                        </Button>
                    </Grid><Grid item xs={12} style={{textAlign: "center"}}>
                        <Button   
                            color="primary"
                            style={styles.submitButton}
                            variant="contained"
                            size="large"
                            onClick={this.connectButtonClicked.bind(this)}>
                            Connect
                        </Button>
                    </Grid>

                    <Grid item xs={12} style={{textAlign: "center"}}>

                        <IconButton>
                            <KeyboardArrowUpIcon style={styles.arrowSize}/>
                        </IconButton>
                        <h1>
                            {this.state.count}
                        </h1>
                        <IconButton>
                            <KeyboardArrowDownIcon style={styles.arrowSize} />
                        </IconButton>

                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default OccupancyCounter;