function svgToCanvas() {
    var btn2 = document.querySelector('#down');
    var svg = document.querySelector('svg');
    var canvas = document.querySelector('canvas');


    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;


    var img = new Image();
    var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    canvas.width = 600
    canvas.height = 600

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        ctx.font = 'bold 20px Serif'; 

        DOMURL.revokeObjectURL(url);

        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

    };
    img.src = url;

    

    btn2.addEventListener('click', function () {
        function triggerDownload (imgURI) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true
            });
        
            var a = document.createElement('a');
            a.setAttribute('download', 'mandala.png');
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');
        
            a.dispatchEvent(evt);
            }
        triggerDownload(canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream'));
    })

}





// exibe nome da empresa
//function nome() {
//    let nomeEmpresa = document.querySelector('input[name="nomeEmpresa"]').value
//    document.getElementById("empresa").innerHTML = nomeEmpresa
//}

// adiciona disabled/readonly depois de enviar forms
// function addReadOnlyAndDisable() {
//     let labels = Array.from(document.getElementsByTagName("label"))
//     labels.forEach(label => {
//         label.setAttribute("readonly", true)
//     });
//     let inputs = Array.from(document.getElementsByTagName("input"))
//     inputs.forEach(input => {
//         input.setAttribute("disabled", true)
//     });
// }