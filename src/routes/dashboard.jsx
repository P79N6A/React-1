// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import Print from "@material-ui/icons/Print";
import IconSettings from "@material-ui/icons/Settings";

import React from "react";

// core components
import Prints from "components/Widgets/Print/Print.jsx";
import AuxAsListItem from "hoc/AuxAsListItem/AuxAsListItem.jsx";
import Settings from "components/Widgets/Settings/Settings"



const dashboardRoutes = [
  
  {
    sidebarName: "Find",
    navbarName: "Find",
    icon: LocationOn,
    component: (<AuxAsListItem><Prints/></AuxAsListItem>), 
    opened:true
  },
  {
    sidebarName: "Control Panel",
    navbarName: "Control Panel",
    icon: IconSettings,
  component: (<Settings/>), 
    opened:false
  }

];

export default dashboardRoutes;
