Template.locations.rendered = function(){  

    var mapData = {
        "US": 498,
        "SA": 200,
        "CA": 1300,
        "DE": 220,
        "FR": 540,
        "CN": 120,
        "AU": 760,
        "BR": 550,
        "IN": 200,
        "GB": 120,
        "RU": 2000
    };

    $('#world-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: "transparent",
        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 0
            }
        },
        series: {
            regions: [{
                values: mapData,
                scale: ["#1ab394", "#22d6b1"],
                normalizeFunction: 'polynomial'
            }]
        }
    });
};
