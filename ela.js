function analyzeImage(input, output, quality, scale) {
    var wb = input.width();
    var hb = input.height();
    var inputCanvas = document.createElement("canvas");
    inputCanvas.width = wb;
    inputCanvas.height = hb;
    var inputCanvasCtx = inputCanvas.getContext('2d');
    inputCanvasCtx.drawImage(input[0], 0, 0, wb, hb);

    var compressedCanvas = document.createElement("canvas");
    compressedCanvas.width = wb;
    compressedCanvas.height = hb;
    var compressedCanvasCtx = compressedCanvas.getContext('2d');

    var sourceData = inputCanvasCtx.getImageData(0, 0, wb, hb);

    input.on('load', function () {
        compressedCanvasCtx.drawImage(input[0], 0, 0);
        var compressedData = compressedCanvasCtx.getImageData(0, 0, wb, hb);
        var data0 = sourceData.data;
        var data1 = compressedData.data;
        for (var i = 0, l = data0.length; i < l; i += 4) {
            for (var j = 0; j < 3; j++) {
                var error = Math.abs(data0[i + j] - data1[i + j]);
                data0[i + j] = error * scale;
            }
        }
        compressedCanvasCtx.putImageData(sourceData, 0, 0);
        output.attr("src", compressedCanvas.toDataURL("image/png"));
    }).attr('src', inputCanvas.toDataURL('image/jpeg', quality * 0.01));
}
