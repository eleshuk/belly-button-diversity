// // Read in the samples.json file -- get metadata
function getMetadata(sample) {
  d3.json("samples.json").then(jsondata => {
    console.log(jsondata);
    var metadata = jsondata.metadata;
    console.log(metadata);

    var filter = metadata.filter(x=>x.id === sample)[0];

    // Select element
    var body = d3.select("#sample-metadata");
    // Clear the body before reloading new info
    body.html("");
    // Append body with the key and value of the metadata
    Object.entries(filter).forEach((key)=>{
      body.append("p").text(`${key}:${value}`);

  console.log(metadata);
    });
  });
};

// OTUs = operational taxonomic units
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
// Build plots
function buildPlots(sample) {
  //get sample data from json like above
  d3.json("samples.json").then(data => {
    var samples = data.samples
    console.log(samples);
  });
};


  // console.log(Object.entries(samples));
//     var trace1 = {
//         x: samples.otu_ids,
//         y: samples.sample_values,
//         type: "bar",
//         name: "Cancer Survival",
//         boxpoints: "all"
//     };
    

// //   // Create the data array for the plot
//   var data = [trace1];

// //   // Define the plot layout
//   var layout = {
//     title: "Square Root of Cancer Survival by Organ",
//     xaxis: { title: "Organ" },
//     yaxis: { title: "Square Root of Survival" }
//   };

// // //   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("bar", data, layout);