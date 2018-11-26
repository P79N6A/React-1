import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import IconTable from "@material-ui/icons/TableChart";

import Aux from "hoc/_Aux/Aux";

const results = () => {


    return (<Aux>

        <ListItemIcon>
            <IconTable />
        </ListItemIcon>
        <ListItemText primary="Results" />
        <ListItemSecondaryAction>
            <Switch  />
        </ListItemSecondaryAction>


    </Aux>);
}

export default results;