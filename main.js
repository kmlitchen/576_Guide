 // Katie Litchen 05May2026
 
 // esri.js modules needed: 
 require([
    // for api key:
    "esri/config",
    // for map elements, custom basemap
    "esri/Map", "esri/views/MapView", "esri/Basemap","esri/layers/VectorTileLayer",
    // for all widgets used
    "esri/widgets/BasemapGallery","esri/widgets/Expand","esri/widgets/Locate","esri/widgets/Search","esri/widgets/Editor","esri/widgets/Legend",
    // for feature layers (no graphics, actually)
    "esri/layers/FeatureLayer", 
    // all modules added to fx - 
], function(esriConfig, Map, MapView, Basemap, vectorTileLayer, BasemapGallery, Expand, Locate, Search, Editor, Legend, FeatureLayer) {   
        
    // esri api key:
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurBvZ7IXFuSOhRBuDgv645DOBpnCJ2vtGJsSqd0m31lu7G8oTSCniq7WBlH5N3K2i5Kk1zQ90Yxo4NRi0pv9a9tVhNCaTXh4UYBVSuMTZ4n-VHPYlh3hbIHglPgtC4dS9xt9DvdwtH300t76D_qaoPY1hHx-ZWazuU7A71NQteoVL5YMZ3d0qyiM8FhAB_8wsn9Lfxg-Z0qlqMFoRqQ2XStDdlWe0dU69PsLBWTeob7thAT1_t2Pq0hM2"
        
//**Basic Map Elements: 
    // tile layer to hold custom basemap: 
    const basemapLayer = new vectorTileLayer({
    portalItem: { 
        id: "659e7c1b1e374f6c8a89eefe17b23380" // "outdoor" tile layer from the living atlas
        }
    });

    // map element: 
    const map = new Map({
    basemap: "streets-vector"
    });
        
    // map view + properties:
    const view = new MapView({  
    map: map,
    center: [-89.384, 43.075], 
    zoom: 12,                 
    container: "Map", // div element
    constraints: {
        minScale: 100,
        maxScale: 500000, // limiting max scale (instead of map extent) to keep focus around WI
    },
    });                         
    
//**Widgets and Customization:
    // move +/- zoom buttons:
    view.ui.move("zoom", "bottom-right");
    
    // basemap gallery widget:
    const basemapGallery = new BasemapGallery({
    view: view,
    });
    const expand = new Expand({ // put basemap gallery widget in an expandable tab 
        view: view,
        content: basemapGallery 
    });
    view.ui.add(expand, "top-right"); //set expandable tab location

    // search widget:
    const search = new Search({
    view: view
    });
    view.ui.add(search, "bottom-left"); // set search bar location

    // locate widget: 
    const locate = new Locate({
    view: view
    });
    view.ui.add(locate, "bottom-left") // set locate button location

// //**Incident Survey Feature Layer:
//     // pop-up for survey results -> contains link to edit the details:
//     const popup_Survey = {
//     "title": "Incident Details:",
//     "content": "<b>Date and Time:</b> {note_the_date_and_time_of_the_i}<br> <b>Description:</b> {incident_details} <br> <a href=https://survey123.arcgis.com/share/39d43140fb4a474fb9292e828b60c619?mode=edit&globalId={globalid}&version=latest><b>Edit Response</b></a>"
//     };    
    
//     // renderer for incident style icon: 
//     const surveyRenderer = {
//     type: "simple",
//     symbol: {
//         type: "picture-marker",
//         url: "https://kmlitchen.github.io/576_Park_Atlas/data/exclamation.png", 
//         width: "14px",
//         height: "14px"
//         }
//     }

//     // feature layer for survey results:
//     const surveyLayer = new FeatureLayer({
//         url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/survey123_39d43140fb4a474fb9292e828b60c619_results/FeatureServer",
//         popupTemplate: popup_Survey,
//         title: "Incident Report", // wanted this to show up instead of the survey 123 text in the editor but idk
//         renderer: surveyRenderer
//     }); map.add(surveyLayer); // add feature layer to map


//**Venue Feature Layer Elements:
    // popup content:
    const popup_venues = {
    "title": "Venue Information:",
    "content": "<b>Name:</b> {Name}<br> <b>Location:</b> {Address} <br> <b>Hours:</b> {Hours} <br> <b>Open:</b> {Season}<br>"
    }; // wanted to also make this editable from the pop-up but idk
    
    // renderer for venue features -> icons by class
    const venueRenderer2 = {
      type: "unique-value",
      field: "Venue_Class",
       defaultSymbol: { 
         type: "picture-marker",
         url: "https://kmlitchen.github.io/576_Guide/data/event.png",
         },
      uniqueValueInfos: [{
        value: "FMKT",
        symbol: {
            type: "picture-marker",
            url: "https://kmlitchen.github.io/576_Guide/data/barn.png"
        }
        },{
        value: "ARTS",
        symbol: {
            type: "picture-marker",
            url: "https://kmlitchen.github.io/576_Guide/data/theater.png"
        }
        },{
        value: "MUSIC",
        symbol: {
            type: "picture-marker",
            url: "https://kmlitchen.github.io/576_Guide/data/music.png"
        }
        },{
        value: "MUS",
        symbol: {
            type: "picture-marker",
            url: "https://kmlitchen.github.io/576_Guide/data/museum.png"
        }
        },{
        value: "OUT",
        symbol: {
            type: "picture-marker",
            url: "https://kmlitchen.github.io/576_Guide/data/park.png"
        }
        }]
      };

    // feature layer for venues:
    const venueLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/576_Test/FeatureServer",
        title: "Venues",
        popupTemplate: popup_venues,
        renderer: venueRenderer2 
    }); map.add(venueLayer)

//**Legend Elements:
    // legend constructor:
    const myLegend = new Legend ({
      view: view,
      layerInfos: [{layer: venueLayer}]//,{layer: surveyLayer}],
    });
    // put legend in expandable widget:
    const legendExpand = new Expand ({
      view: view,
      content: myLegend
    })
    view.ui.add(legendExpand, "top-right"); // put legend in expandable tab


//**Editor Elements:
    // editor constructor:
    const editor = new Editor({
      view: view,
      layerInfos: [{layer: venueLayer}]//,{layer: surveyLayer}],
    });

    // expand widget for editor:
    const editorExpand = new Expand({ //put editor in an expandable tab
        view: view,
        content: editor
    });
    view.ui.add(editorExpand, "top-right"); //set expandable tab location

});