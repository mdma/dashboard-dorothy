
// Dash5 Logic

Template.dashboard5.rendered = function(){

    // Set white background color for top navbar

    $('body').addClass('light-navbar');

    // Dummy data
    var data1 = [
        [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,20],[11,10],[12,13],[13,4],[14,7],[15,8],[16,12]
    ];
    var data2 = [
        [0,0],[1,2],[2,7],[3,4],[4,11],[5,4],[6,2],[7,5],[8,11],[9,5],[10,4],[11,1],[12,5],[13,2],[14,5],[15,2],[16,0]
    ];

    var data3 = [
        [0,6],[1,3],[2,7],[3,4],[4,10],[5,4],[6,2],[7,6],[8,10],[9,2],[10,7],[11,4],[12,6],[13,2],[14,5],[15,2],[16,0]
    ];

    // Wind Speed
    $("#chart1").length && $.plot($("#chart1"), [
            data1,  data2,  data3
        ],
        {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.0
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,

                borderWidth: 2,
                color: 'transparent'
            },
            colors: ["#1ab394", "#1C84C6", "#DB4C40" ],
            xaxis:{
            },
            yaxis: {
            },
            tooltip: false
        }
    );

    // Amount Percipitation
    $("#chart2").length && $.plot($("#chart2"), [
            data1,  data2,  data3
        ],
        {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.0
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,

                borderWidth: 2,
                color: 'transparent'
            },
            colors: ["#1ab394", "#1C84C6", "#DB4C40" ],
            xaxis:{
            },
            yaxis: {
            },
            tooltip: false
        }
    );
};
