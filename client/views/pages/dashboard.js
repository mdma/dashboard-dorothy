var pinoccio;

var scouts = [];
var Scout = function() {
    this.name = 'Location';
    this.last_update = 'Today';
    this.uuid = 0;
    this.battery_percentage = '93%';
    this.temperature = "72°";
    this.uptime = 0;
};

var dc = { //data container
    tmp1: [],
    tmp2: [],
    tmp3: [],
    hmd1: [],
    hmd2: [],
    hmd3: []
}

var tempPlot = null,
    humidPlot = null;

Template.dashboard.rendered = function(){

    // Set white background color for top navbar
    $('body').addClass('light-navbar');

    // Sparkline Charts
    var sparklineCharts = function(){
        $("#sparkline1").sparkline([10, 9, 11, 8, 15, 12, 10, 16], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#1ab394',
            fillColor: "transparent"
        });

        $("#sparkline2").sparkline([32, 11, 25, 37, 41, 32, 34, 42], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#1ab394',
            fillColor: "transparent"
        });

        $("#sparkline3").sparkline([34, 22, 24, 41, 10, 18, 16,8], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#1C84C6',
            fillColor: "transparent"
        });
    };

    var sparkResize;

    $(window).resize(function(e) {
        clearTimeout(sparkResize);
        sparkResize = setTimeout(sparklineCharts, 500);
    });


    $("#sparkline1").sparkline([34, 43, 43, 35, 44, 32, 44, 52], {
        type: 'line',
        width: '100%',
        height: '60',
        lineColor: '#1ab394',
        fillColor: "#ffffff"
    });

    $("#sparkline2").sparkline([24, 43, 43, 55, 44, 62, 44, 72], {
        type: 'line',
        width: '100%',
        height: '60',
        lineColor: '#1ab394',
        fillColor: "#ffffff"
    });

    $("#sparkline3").sparkline([74, 43, 23, 55, 54, 32, 24, 12], {
        type: 'line',
        width: '100%',
        height: '60',
        lineColor: '#ed5565',
        fillColor: "#ffffff"
    });

    $("#sparkline4").sparkline([24, 43, 33, 55, 64, 72, 44, 22], {
        type: 'line',
        width: '100%',
        height: '60',
        lineColor: '#ed5565',
        fillColor: "#ffffff"
    });

    $("#sparkline5").sparkline([1, 4], {
        type: 'pie',
        height: '140',
        sliceColors: ['#3893CD', '#FFF']
    });

    $("#sparkline6").sparkline([5, 3], {
        type: 'pie',
        height: '140',
        sliceColors: ['#3893CD', '#F5F5F5']
    });

    $("#sparkline7").sparkline([2, 2], {
        type: 'pie',
        height: '140',
        sliceColors: ['#3893CD', '#F5F5F5']
    });

    $("#sparkline8").sparkline([2, 3], {
        type: 'pie',
        height: '140',
        sliceColors: ['#3893CD', '#F5F5F5']
    });


     sparklineCharts();

    

    // Initiate PinoccioAPI

    pinoccio = pinoccioAPI('825bc05c3aa855810a0581921196f0b8');

    pinoccio.login("mmclaughlin@brunoair.com", "alpineroot", function(error, data) {
    });

    pinoccio.rest({ url:"/v1/11/scouts" }, function( error, scoutsJSON ) {
        if(error) return console.log('Oh No. I got an error getting my troops!', error);

        scoutsJSON.push({name: "[5] (QP)",updated: "1451689199399",id: 5,time: 1450820329873});
        scoutsJSON.push({name: "[6] (WR)",updated: "1451689199399",id: 6,time: 1450820329873});

        for(index in scoutsJSON)
        {
            var scout = new Scout();
            scout.name = scoutsJSON[index].name;
            scout.uuid = "011-0" + scoutsJSON[index].id;

            scouts[index] = scout;
        }

        // Columns
        // 0 - Name
        // 1 - Last Update
        // 2 - UUID
        // 3 - Battery Percentage
        // 4 - Onboard Temperature
        // 5 - Uptime

        if(scoutsJSON) {
            nodesTable = $('.nodes-table').dataTable({
                "processing": true,
                data: scouts,
                "columns": [
                    { "data": "name" },
                    { "data": "last_update"},
                    { "data": "uuid" },
                    { "data": "battery_percentage"},
                    { "data": "temperature"},
                    { "data": "uptime"}
                ]
            });

            // Begin stream
            syncPinoccio();
        }
    });
};

function syncPinoccio() {

    console.log('Sync')
    pinoccio.sync().on('data',function(data) {

        console.log(data);

        if(data.type == 'custom.BME') {
            var json = JSON.parse(data.value.custom[0]);

            if (tempPlot == null) {
                // Temperature
                tempPlot = $.plot($("#chart2"), [

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
                        colors: ["#1ab394"],
                        xaxis:{
                        },
                        yaxis: {
                        },
                        tooltip: false
                    }
                );
            }

            if (humidPlot == null) {
                // Temperature
                humidPlot = $.plot($("#chart1"), [

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
                                fill: 0.4
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
                        colors: ["#1ab394"],
                        xaxis:{
                        },
                        yaxis: {
                        },
                        tooltip: false
                    }
                );
            }

            else {

                if (!json) {
                    //Temp
                    dc["tmp"+(data.scout-1)].push([dc["tmp"+(data.scout-1)].length, 0 + returnJitter(0.2)]);
                    tempPlot.setData(returnTempArray());
                    tempPlot.setupGrid();
                    tempPlot.draw();
                    //Humidity
                    dc["hmd"+(data.scout-1)].push([dc["hmd"+(data.scout-1)].length, 0 + returnJitter(0.2)]);
                    humidPlot.setData(returnHmdArray());
                    humidPlot.setupGrid();
                    humidPlot.draw();
                }
                if (json) {
                    //Temp
                    dc["tmp"+(data.scout-1)].push([dc["tmp"+(data.scout-1)].length, ((json.t * 1.8) +32) + returnJitter(0.2)]);
                    tempPlot.setData(returnTempArray());
                    tempPlot.setupGrid();
                    tempPlot.draw();
                    //Humidity
                    dc["hmd"+(data.scout-1)].push([dc["hmd"+(data.scout-1)].length, json.h + returnJitter(0.2)]);
                    humidPlot.setData(returnHmdArray());
                    humidPlot.setupGrid();
                    humidPlot.draw();
                    //Pressure
            }
        }

    });
};

function returnTempArray() {
    var array = [
        dc.tmp1,
        dc.tmp2,
        dc.tmp3   
    ];

    return array;
}

function returnHmdArray() {
    var array = [
        dc.hmd1,
        dc.hmd2,
        dc.hmd3  
    ];

    return array;
}


function returnJitter(intensity)
{
    return (Math.random() - 0.5) * intensity;
}

function returnJitterArray(count, intensity)
{
    var array = [];

    for (var i = 0; i < count; i++)
    {
        array.push(returnJitter(intensity));
    }

    return array;
}

