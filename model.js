// Работа с моделью

// Считывание модели из файла
function GetModel() {
    function Load() {
        httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", "/RayTracing_on_JS/Model.txt", true);
        httpRequest.onreadystatechange = OnRequestStateChange;
        httpRequest.send(null);
    }
    function OnRequestStateChange() {
        if (httpRequest.readyState != 4) {
            document.getElementById("modelBox").innerHTML = '!!! Model loading error !!!';
            return;
        }
        if (httpRequest.status != 200)
            return;
        let _model = httpRequest.responseText;
        let _str = '';
        let _v = 0;
        let _f = 0;
        let _vt = 0;
        for (let i = 0; i <= _model.length; i++) {
            if (_model[i] != '\n') {
                _str += _model[i];
            }
            else {
                if (_str[0] == 'v' && _str[1] == ' ') { // ищем вида 'v 0.608654 -0.568839 -0.416318'
                    let _exp = /-*\d+(\.\d+)*/gi;
                    let _res = _str.match(_exp);
                    model_vertices[_v] = [];
                    model_vertices_original[_v] = [];
                    for (let k = 0; k < _res.length; k++) {
                        if (_res.length == 3) { // на всякий...
                            model_vertices[_v][k] = _res[k];
                            model_vertices_original[_v][k] = _res[k];
                        }
                    }
                    _v++;
                }
                else if (_str[0] == 'f' && _str[1] == ' ') { // ищем вида 'f 1193/1240/1193 1180/1227/1180 1179/1226/1179'
                    let _exp = /(-*\d+\/*)+/g;
                    let _res = _str.match(_exp);
                    model_faces[_f] = [];
                    for (let k = 0; k < _res.length; k++) {
                        model_faces[_f][k] = [];
                        let _exp = /-*\d+/g; // ищем вида '1123/1170/1123'
                        let _str = _res[k];
                        let __res = _str.match(_exp);
                        //console.log(__res);
                        for (let l = 0; l < __res.length; l++) {
                            model_faces[_f][k][l] = __res[l];
                        }
                    }
                    _f++;
                }
                else if (_str[0] == 'v' && _str[1] == 't' && _str[2] == ' ' && _str[3] == ' ') { // ищем вида vt 0.443 0.976 0.000
                    let _exp = /-*\d+(\.\d+)*/gi;
                    let _res = _str.match(_exp)
                    model_vertices_textures[_vt] = [];
                    for (let k = 0; k < _res.length; k++) {
                        if (_res.length == 3) { // на всякий...
                            model_vertices_textures[_vt][k] = _res[k];
                        }
                    }
                    _vt++;
                }
                _str = '';
            }
        }
        document.getElementById("modelBox").innerHTML = _model;
        (function model_scaling() { // масштабирование под экран
            for (let i = 0; i < model_vertices.length; i++) {
                model_vertices[i][0] = (model_vertices[i][0] * model_size_cf) + x_pos_cf;
                model_vertices[i][1] = (model_vertices[i][1] * model_size_cf) + y_pos_cf;
                model_vertices[i][2] = (model_vertices[i][2] * model_size_cf);
            }
        }());
    }
    Load();
}

// Считывание текстуры из файла
function GetTexture() {
    let img = new Image();
    img.src = "RayTracing_on_JS/african_head_diffuse.png";
    img.onload = function () {
        texture_context.drawImage(img, 0, 0);
        readTextureToArray();
    };
    function readTextureToArray() {
        let textureData = texture_context.getImageData(0, 0, texture_canvas.width, texture_canvas.height);
        let i = 0;
        for (let x = 0; x < texture_canvas.width; x++) { // двумерный массив
            texture_array[x] = [];
            for (let y = 0; y < texture_canvas.height; y++) {
                let red = textureData.data[i];
                let green = textureData.data[i + 1];
                let blue = textureData.data[i + 2];
                texture_array[x][y] = ({ red, green, blue });
                i += 4;
            }
        }
        textureData = []; // Массив картинки текстуры
    }
}

// функция конвертации координат модели в текстурные (z - не нужен)
function get_texture_coord(_x, _y) {
    let x = Math.round(_x * texture_array.length);
    let y = Math.round(texture_canvas.width - (_y * texture_array[0].length));
    return { x, y };
}