import React from "react";
import ListItem from '@material-ui/core/ListItem';

class specialAux extends React.Component{

render(){

    const styles= {
      paddingLeft: 4,//theme.spacing.unit * 4,
      backgroundColor:  "#FFFFFF",
      boxShadow:
        "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        boxShadow:
          "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)"
      }
    }

const children =React.Children.map(this.props.children,(child,i)=><ListItem button style={styles}>{child}</ListItem>);

return children;
}

}

export default specialAux;