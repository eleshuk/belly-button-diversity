// // Read in the samples.json file -- get metadata
function getMetadata(sample) {
  d3.json("samples.json").then(jsondata => {
    console.log(jsondata);
    var metadata = jsondata.metadata;
    console.log(metadata);

    var filter = metadata.filter(x=>x.sample === metadata.id)[0];

    // Select element
    var body = d3.select("#sample-metadata");
    // Clear the body before reloading new info
    body.html("");
    // Append body with the key and value of the metadata
      Object.entries(filter).forEach((key)=>{
        body.append("p").text(key[0] + ": " + key[1]);
        console.log(key[0]);
        console.log(key[1]);
    });
  });
};

// OTUs = operational taxonomic units
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
function buildPlots(sample) {
  //get sample data from json like above
  d3.json("samples.json").then(data => {
    // Filter by ID
    var samples = data.samples;
    // Filter the samples data
    var sampleArray = data.samples.filter(x=>x.sample === samples.id)[0];
    console.log(sampleArray);

    // Get top 10 sample values
    var top10 = sampleArray.sample_values.slice(0,10).reverse();
    console.log(top10);

    // Get top otu_ids
    var otu = sampleArray.otu_ids.slice(0,10).reverse();
    var otu_ids = otu.map(x=> "OTU_" + x);
    console.log(otu_ids);

    // Top ten labels
    var labels = sampleArray.otu_labels.slice(0,10).reverse();
    console.log(labels);
    
    // Plot bar
    var trace1 = {
      x: top10,
      y: otu_ids,
      text: labels,
      marker: {
        color: 'Green'},
      type: "bar", 
      orientation: "h",
      };

    var data1 = [trace1]

    Plotly.newPlot("bar", data1)

    // Plot bubble
    var trace2 = {
      x: sampleArray.otu_ids,
      y: sampleArray.sample_values,
      mode: "markers", 
      marker: {
        size: sampleArray.sample_values,
        color: sampleArray.otu_ids,
        backgroundColor: 'rgba(0, 0, 0, 0.1)' 
      },
      text: sampleArray.otu_labels
    };

    var layout = {
      xaxis: {
        title: "OTU ID"
      },
      height: 800,
      width: 1400
    };

    var data2 = [trace2]

    Plotly.newPlot("bubble", data2, layout)
    });
  }
  
// buildPlots();

// Initialize default plot
function init() {
  d3.json("samples.json").then((data)=> {
    data.names.forEach((name)=> {
      d3.select("#selDataset")
      .append("option")
      .text(name)
      .property("value");
    });
    buildPlots(data.names[0]);
    getMetadata(data.names[0]);
  });
};
init();

// Function for event change
function optionChanged(sample) {
  buildPlots(sample);
  getMetadata(sample);
};