import React from "react";
import Aux from "hoc/_Aux/Aux.jsx";
import Legend from "components/Settings/Legend/Legend.jsx";
import Results from "components/Settings/Results/Results.jsx";
import AuxAsListItem from "hoc/AuxAsListItem/AuxAsListItem.jsx";


const settings = () => {


    return (<Aux><AuxAsListItem><Legend/></AuxAsListItem><AuxAsListItem><Results/></AuxAsListItem></Aux>);
}

export default settings;