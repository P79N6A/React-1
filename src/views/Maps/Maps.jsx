import React from "react";


import {
  Map,WebMap, loadModules
} from "react-arcgis"

const mapStyle = { border: 'dashed', height: '80vh', width: '50vw' }



class Maps extends React.Component {

  stat = {
    map: null,
    view: null
  }

  mapLoadHandeler = (map, view) => {

  //  this.setState({ map, view });


    loadModules(["esri/widgets/Expand", "esri/widgets/BasemapGallery","esri/widgets/LayerList","esri/widgets/Home", 'esri/widgets/Legend', 'esri/layers/FeatureLayer', "esri/widgets/Print"]).then(([Expand,BasemapGallery,LayerList,Home,Legend, FeatureLayer,Print]) => {
      // var myFl = new FeatureLayer({
      //   portalItem: {
      //     id: "dd555c0b2af04e9ea73d7442e394c056"
      //   }
      // });
      // map.add(myFl);


     var myFl=map.layers.getItemAt(0);


var print=new Print({
  view:view,
  printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
})



var bg = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

var legend = new Legend({
  view: view,
  layerInfos: [
      {
          layer: myFl,
          title: "Ports"
      }]
});

var layerList = new LayerList({
  view: view
});

var layerListExpand = new Expand({
  view: view,
  content: layerList
});

var legendExpand = new Expand({
  view: view,
  content: legend
});

var basemapExpand = new Expand({
  view: view,
  content: bg
});

var printExpand = new Expand({
  view: view,
  content: print
});

var homeBtn = new Home({
  view: view
});


view.ui.add(homeBtn, "top-left");
view.ui.add(layerListExpand, "top-right");
view.ui.add(basemapExpand, "top-right");
view.ui.add(legendExpand, "bottom-right");
view.ui.add(printExpand, "top-right");



    });

  }




  render() {

    return (


      // <div style={{ height: '100vh' }}>
      //   <Map mapProperties={{ basemap: 'satellite' }} onLoad={this.mapLoadHandeler} />
      // </div>


<div style={{ height: '90vh' }}>
<WebMap id="6627e1dd5f594160ac60f9dfc411673f" onLoad={this.mapLoadHandeler}/>
</div>

    );

  }

}

export default Maps;

//<WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
//      <WebScene id="f8aa0c25485a40a1ada1e4b600522681" />

// loadingElement={<div style={{ height: `100%` }} />}
// containerElement={<div style={{ height: `100vh` }} />}
//mapElement={<div style={{ height: `100%` }} />}


//<div style={{ height: '100vh' }}>
// <WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
//</div>