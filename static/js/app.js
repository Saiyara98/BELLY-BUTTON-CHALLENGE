function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
        .then(data => {
            dataSet = data;

            d3.select("#selDataset")
                .selectAll("option")
                .data(dataSet.names)
                .enter()
                .append("option")
                .text(sample => sample)
                .property("value", sample => sample)
                .on("change", updatePlotly);

            
            updatePlotly(dataSet.names[0]);
        })
        
}
function updatePlotly(selectedSample) {
    var selectedIndex = dataSet.names.indexOf(selectedSample);
    var sample_values = dataSet.samples[selectedIndex].sample_values.slice(0, 10).reverse();
    var otu_ids = dataSet.samples[selectedIndex].otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    var otu_labels = dataSet.samples[selectedIndex].otu_labels.slice(0, 10).reverse();

    var trace1 = {
        x: sample_values,
        y: otu_ids,
        type: 'bar',
        text: otu_labels,
        orientation: 'h',
        marker: {
            color: 'DarkMagenta'
        }
    };

    var layout = {
        title: ``,
        xaxis: { title: '' },
        yaxis: { title: '' }
    };
 
    Plotly.react("bar", [trace1], layout);
}
function updatePlotly(selectedSample) {
    var selectedIndex = dataSet.names.indexOf(selectedSample);
    var { otu_ids, sample_values, otu_labels } = dataSet.samples[selectedIndex];

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,  // Use otu_ids for marker colors
            colorscale: 'Bluered'
        },
        text: otu_labels
    };

    var layout = {
        title: ``,
        xaxis: { title: '' },
        yaxis: { title: '' }
    };

    // Use Plotly.react for updates to avoid creating new plots each time
    Plotly.react("bubble", [trace1], layout);
}
init();






