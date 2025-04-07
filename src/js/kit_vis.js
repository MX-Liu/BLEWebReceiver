
const colors = ["#FF355E", "#FD5B78", "#FF6037", "#FF9966", "#FF9933", "#FFCC33", "#FFFF66", "#FFFF66", "#CCFF00", "#66FF66", "#AAF0D1", "#50BFE6", "#FF6EFF", "#EE34D2", "#FF00CC", "#FF00CC"];


//plotly data 

var frameBufferSize = 4000; //data size for calculation

// var graphData = {current:[], voltage:[], frequency:[], magnitude:[], phase:[], 
//                  LightCh1:[], LightCh2:[], LightCh3:[], LightCh4:[], LightCh5:[],
//                  LightCh6:[], LightCh7:[], LightCh8:[], LightCh9:[], LightCh10:[],}


var graphData = {
    magnitude1: [], phase1: [],
    magnitude2: [], phase2: [],
    magnitude3: [], phase3: [],
    magnitude4: [], phase4: [],

    Ax: [], Ay: [], Az: [], Gx: [], Gy: [], Gz: [],
    LightCh1: [], LightCh2: [], LightCh3: [], LightCh4: [], LightCh5: [],
    LightCh6: [], LightCh7: [], LightCh8: [], LightCh9: [], LightCh10: [],
}



for (i = 0; i < frameBufferSize; i++) {
    // graphData.magnitude.push(0); graphData.phase.push(0); 
    graphData.magnitude1.push(0); graphData.phase1.push(0);
    graphData.magnitude2.push(0); graphData.phase2.push(0);
    graphData.magnitude3.push(0); graphData.phase3.push(0);
    graphData.magnitude4.push(0); graphData.phase4.push(0);

    graphData.Ax.push(0); graphData.Ay.push(0); graphData.Az.push(0);
    graphData.Gx.push(0); graphData.Gy.push(0); graphData.Gz.push(0);
    graphData.LightCh1.push(0); graphData.LightCh2.push(0); graphData.LightCh3.push(0); graphData.LightCh4.push(0); graphData.LightCh5.push(0);
    graphData.LightCh6.push(0); graphData.LightCh7.push(0); graphData.LightCh8.push(0); graphData.LightCh9.push(0); graphData.LightCh10.push(0);
}




var sampleRate = 1000 / 80;  // sampling rate TBD
var xaxis = [];
// for (i = 0; i < frameBufferSize; i++) {
//   xaxis.push((i*sampleRate)/frameBufferSize+" Hz");
// }


function initGraph() {

    var traceData0 = [];
    var traceData1 = [];
    var traceData2 = [];
    var traceData3 = [];

    var properties0 = ["Magnitude1", "Magnitude2", "Magnitude3", "Magnitude4"];
    var properties1 = ["Phase1", "Phase2", "Phase3", "Phase4"];
    var properties2 = ["Ax", "Ay", "Az"];
    var properties3 = ["Gx", "Gy", "Gz"];

    // initialize legend 
    properties0.forEach(function (key) {
        var trace = { y: [], mode: 'scatter', opacity: 0.7, name: key };
        traceData0.push(trace);
    });
    properties1.forEach(function (key) {
        var trace = { y: [], mode: 'scatter', opacity: 0.7, name: key };
        traceData1.push(trace);
    });
    properties2.forEach(function (key) {
        var trace = { y: [], mode: 'scatter', opacity: 0.7, name: key };
        traceData2.push(trace);
    });

    properties3.forEach(function (key) {
        var trace = { y: [], mode: 'scatter', opacity: 0.7, name: key };
        traceData3.push(trace);
    });

    Plotly.plot('plot0', traceData0,
        {
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            margin: { l: 60, r: 30, b: 25, t: 25 },
            color: '#ffffff',
            'xaxis': { 'range': [frameBufferSize], 'autorange': "true" },
            // 'yaxis': {'range': [-1, 1]},
            // 'yaxis': {'range': [frameBufferSize], 'autorange': "true"},
            // 'xaxis': {'range': [-1100, 1100]}

        });

    Plotly.plot('plot1', traceData1,
        {
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            margin: { l: 60, r: 30, b: 25, t: 25 },
            color: '#ffffff',
            // 'xaxis': { 'range': [frameBufferSize], 'autorange': "true" },
            'yaxis': { 'range': [frameBufferSize], 'autorange': "true" },
            // 'yaxis': {'range': [-360, 360]}
        });

    Plotly.plot('plot2', traceData2,
        {
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            margin: { l: 60, r: 30, b: 25, t: 25 },
            color: '#ffffff',
            // 'xaxis': { 'range': [frameBufferSize], 'autorange': "true" },
            'yaxis': { 'range': [frameBufferSize], 'autorange': "true" }
        });

    Plotly.plot('plot3', traceData3,
        {
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            margin: { l: 60, r: 30, b: 25, t: 25 },
            color: '#ffffff',
            // 'xaxis': {'range': [frameBufferSize], 'autorange': "true"},
            'yaxis': { 'range': [frameBufferSize], 'autorange': "true" }
        });

}

// redraw plots
function updatePlots(indata) {
    //indata type defined in kit_data
    if (indata.dataID == 1) {
        graphData.magnitude1.push(indata.magnitude1);
        graphData.phase1.push(indata.phase1);
        graphData.magnitude2.push(indata.magnitude2);
        graphData.phase2.push(indata.phase2);
        graphData.magnitude3.push(indata.magnitude3);
        graphData.phase3.push(indata.phase3);
        graphData.magnitude4.push(indata.magnitude4);
        graphData.phase4.push(indata.phase4);

        // shift oldest sample to maintain frameBufferSize
        if (graphData.magnitude1.length > frameBufferSize) {
            graphData.magnitude1.shift();
            graphData.phase1.shift();

            graphData.magnitude2.shift();
            graphData.phase2.shift();

            graphData.magnitude3.shift();
            graphData.phase3.shift();

            graphData.magnitude4.shift();
            graphData.phase4.shift();

        }
        // Update graph
        Plotly.update('plot0', {
            y: [graphData.magnitude1.slice(frameBufferSize - 200, frameBufferSize),
            graphData.magnitude2.slice(frameBufferSize - 200, frameBufferSize),
            graphData.magnitude3.slice(frameBufferSize - 200, frameBufferSize),
            graphData.magnitude4.slice(frameBufferSize - 200, frameBufferSize)
            ]
        });

        Plotly.update('plot1', {
            y: [graphData.phase1.slice(frameBufferSize - 200, frameBufferSize),
            graphData.phase2.slice(frameBufferSize - 200, frameBufferSize),
            graphData.phase3.slice(frameBufferSize - 200, frameBufferSize),
            graphData.phase4.slice(frameBufferSize - 200, frameBufferSize)
            ]
        });
    }

    if (indata.dataID == 2) {

        graphData.Ax.push(indata.Ax);
        graphData.Ay.push(indata.Ay);
        graphData.Az.push(indata.Az);

        graphData.Gx.push(indata.Gx);
        graphData.Gy.push(indata.Gy);
        graphData.Gz.push(indata.Gz);


        // shift oldest sample to maintain frameBufferSize
        if (graphData.Ax.length > frameBufferSize) {
            graphData.Ax.shift();
            graphData.Ay.shift();
            graphData.Az.shift();

            graphData.Gx.shift();
            graphData.Gy.shift();
            graphData.Gz.shift();

        }

        // Update graph
        Plotly.update('plot2', {
            y: [graphData.Ax.slice(frameBufferSize - 200, frameBufferSize),
            graphData.Ay.slice(frameBufferSize - 200, frameBufferSize),
            graphData.Az.slice(frameBufferSize - 200, frameBufferSize),
            ]
        });

        // Update graph
        Plotly.update('plot3', {
            y: [graphData.Gx.slice(frameBufferSize - 200, frameBufferSize),
            graphData.Gy.slice(frameBufferSize - 200, frameBufferSize),
            graphData.Gz.slice(frameBufferSize - 200, frameBufferSize),
            ]
        });
    }

    if (indata.dataID == 3) {
        graphData.LightCh1.push(indata.LightCh1);
        graphData.LightCh2.push(indata.LightCh2);
        graphData.LightCh3.push(indata.LightCh3);
        graphData.LightCh4.push(indata.LightCh4);
        graphData.LightCh5.push(indata.LightCh5);
        graphData.LightCh6.push(indata.LightCh6);
        graphData.LightCh7.push(indata.LightCh7);
        graphData.LightCh8.push(indata.LightCh8);
        graphData.LightCh9.push(indata.LightCh9);
        graphData.LightCh10.push(indata.LightCh10);


        // shift oldest sample to maintain frameBufferSize
        if (graphData.LightCh1.length > frameBufferSize) {
            graphData.LightCh1.shift();
            graphData.LightCh2.shift();
            graphData.LightCh3.shift();
            graphData.LightCh4.shift();
            graphData.LightCh5.shift();
            graphData.LightCh6.shift();
            graphData.LightCh7.shift();
            graphData.LightCh8.shift();
            graphData.LightCh9.shift();
            graphData.LightCh10.shift();
        }

        // Update graph
        Plotly.update('plot3', {
            y: [
                graphData.LightCh1.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh2.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh3.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh4.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh5.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh6.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh7.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh8.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh9.slice(frameBufferSize - 10, frameBufferSize),
                graphData.LightCh10.slice(frameBufferSize - 10, frameBufferSize),
            ]
        });
    }

}
