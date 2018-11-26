import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import IconMap from "@material-ui/icons/Map";

import Aux from "hoc/_Aux/Aux";

const legend = () => {


    return (<Aux>


        <ListItemIcon>
            <IconMap />
        </ListItemIcon>
        <ListItemText primary="Legend" />
        <ListItemSecondaryAction>
            <Switch />
        </ListItemSecondaryAction>


    </Aux>);
}

export default legend;