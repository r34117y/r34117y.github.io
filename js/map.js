var languageFeatureMap = {
    'be' : ['BLR'],
    'bg' : ['BGR'],
    'cs' : ['CZE'],
    'de' : ['DEU', 'CHE', 'AUT'],
    'el' : ['GRC'],
    'en' : ['GBR', 'USA', 'CAN', 'AUS'],
    'es' : ['ESP'],
    'fr' : ['FRA'],
    'ga' : ['IRL'],
    'hu' : ['HUN'],
    'it' : ['ITA'],
    'lt' : ['LTU'],
    'mk' : ['MKD'],
    'nl' : ['NLD', 'BEL'], //niderlandzki, brak flamandzkiego (Belgia)
    'pl' : ['POL'],
    'pt' : ['PRT'],
    'ro' : ['ROU'],
    'ru' : ['RUS'],
    'sk' : ['SVK'],
    'sl' : ['SVN'],
    'tr' : ['TUR'],
    'uk' : ['UKR'],
}

function doAjax(targetLang, sourceLang) {
    sourceLang = sourceLang || 'pl';
    var sourceText = document.getElementById('srcText').value;

    var uri = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    var xhr = createCORSRequest('GET', uri);

    xhr.send(null);

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var response = JSON.parse(xhr.responseText);
                var translated = response[0][0][0]
                for (var i = 0; i < languageFeatureMap[targetLang][i].length; i++) {
                    var feature = vectorLayer.getSource()
                        .getFeatureById(languageFeatureMap[targetLang]);
                    if (feature) {
                        feature.set('name', translated)
                        vectorLayer.getStyle()(feature);
                    } else {
                        console.log("Błędna odpowiedź dla języka: " + targetLang);
                        console.log(response)
                    }
                }
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

function doTranslate() {
    for(var key in languageFeatureMap) {
        if (languageFeatureMap.hasOwnProperty(key)) {
            doAjax(key)
        }
    }
}


var style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new ol.style.Stroke({
        color: '#319FD3',
        width: 1
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: function(feature) {
        style.getText().setText(feature.get('name'));
        return style;
    }
});

var map = new ol.Map({
    layers: [vectorLayer],
    target: 'map',
    view: new ol.View({
        center: [0, 0],
        zoom: 1
    })
});

var highlightStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#f00',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0.1)'
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 3
        })
    })
});

var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: function(feature) {
        highlightStyle.getText().setText(feature.get('name'));
        return highlightStyle;
    }
});

var highlight;
var displayFeatureInfo = function(pixel) {

    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });

    if (feature !== highlight) {
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }

};

map.on('pointermove', function(evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('rendercomplete', function (evt) {
    doTranslate()
})

/**
 * Eksport mapy do png
 */
document.getElementById('export-png').addEventListener('click', function() {
    map.once('rendercomplete', function() {
        var mapCanvas = document.createElement('canvas');
        var size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
            if (canvas.width > 0) {
                var opacity = canvas.parentNode.style.opacity;
                mapContext.globalAlpha = opacity === '' ? 0.5 : Number(opacity);
                var transform = canvas.style.transform;
                // Get the transform parameters from the style's transform matrix
                var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                // Apply the transform to the export map context
                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                mapContext.drawImage(canvas, 0, 0);
            }
        });
        if (navigator.msSaveBlob) {
            // link download attribuute does not work on MS browsers
            navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
        } else {
            var link = document.getElementById('image-download');
            link.href = mapCanvas.toDataURL();
            link.click();
        }
    });
    map.renderSync();
});

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}

