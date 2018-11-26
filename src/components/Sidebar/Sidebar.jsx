import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import ControlContainer from "components/ControlContainer/ControlContainer.jsx"

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)

  const { classes, color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {


console.log(prop.component)
        return (
          <ControlContainer  color={color} opened={prop.opened} key={key} sidebarName={prop.sidebarName} textClasses={classes.itemText} iconClasses={classes.itemIcon} icon={prop.icon}>{prop.component}</ControlContainer>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>
          <HeaderLinks />
          {links}
        </div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        anchor="left"
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>{links}</div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>
  </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
