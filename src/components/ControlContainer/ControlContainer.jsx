import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from "@material-ui/core/Icon";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Aux from 'hoc/_Aux/Aux'
import classNames from "classnames";
import sidebarContainerStyle from "assets/jss/material-dashboard-react/components/sidebarContainerStyle.jsx";



class ControlContainer extends React.Component {
  state = {
    open: this.props.opened,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));

  };

  render() {

    /* alert(this.props.opened)*/

    const { classes } = this.props;


    const listItemClasses = classNames({
      [" " + classes[this.props.color]]: this.state.open
    });

    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]: this.state.open
    });

    const children = this.props.children
    
//     React.Children.map(this.props.children, (child, i) =>{ 
            
// console.log(child)
//       return(<ListItem button className={classes.nested}>{child}</ListItem>)
    
//       }
//     );

    return (

      <Aux>
        <ListItem button onClick={this.handleClick} className={listItemClasses}>
          <ListItemIcon className={this.props.iconClasses + whiteFontClasses}>
            {typeof this.props.icon === "string" ? (
              <Icon>{this.props.icon}</Icon>
            ) : (
                <this.props.icon />
              )}
          </ListItemIcon>
          <ListItemText primary={this.props.sidebarName} className={this.props.textClasses + whiteFontClasses} disableTypography={true} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      </Aux>
    );
  }
}

ControlContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarContainerStyle)(ControlContainer);


