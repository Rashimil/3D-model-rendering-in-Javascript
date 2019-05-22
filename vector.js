// Функции работы с ввекторами

// Нахождение угла между векторами AB и CD (косинус угла)
function VectorAngle_DOTS(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) { // Координаты задаются точками начала и конца, векторы вида AB и CD
    let AB = [Bx - Ax, By - Ay, Bz - Az]; // вектор AB по координатам точек
    let CD = [Dx - Cx, Dy - Cy, Dz - Cz]; // вектор CD по координатам точек
    let ABx = AB[0];
    let ABy = AB[1];
    let ABz = AB[2];
    let CDx = CD[0];
    let CDy = CD[1];
    let CDz = CD[2];
    let ABCD = ABx * CDx + ABy * CDy + ABz * CDz; //скалярное произведение векторов
    let length_AB = Math.sqrt(Math.pow(ABx, 2) + Math.pow(ABy, 2) + Math.pow(ABz, 2));// длина вектора AB
    let length_CD = Math.sqrt(Math.pow(CDx, 2) + Math.pow(CDy, 2) + Math.pow(CDz, 2));// длина вектора CD
    let result = (ABCD / (length_AB * length_CD));
    return result;
}

// Функции умножения трехмерных векторов (векторное произведение). Выдает координаты скаляра. т. е. перпендикуляра к поверхности, на которой лежат исходные вектора     
function VectorMuliple_DOTS(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) { // Координаты задаются точками начала и конца, векторы вида AB и CD
    let AB = [Bx - Ax, By - Ay, Bz - Az]; // вектор AB по координатам точек
    let CD = [Dx - Cx, Dy - Cy, Dz - Cz]; // вектор CD по координатам точек
    let ABx = AB[0];
    let ABy = AB[1];
    let ABz = AB[2];
    let CDx = CD[0];
    let CDy = CD[1];
    let CDz = CD[2];
    let i = (ABy * CDz - ABz * CDy);
    let j = -1 * (ABx * CDz - ABz * CDx); // отрицательное, для нужной тройки векторов
    let k = (ABx * CDy - ABy * CDx);
    let result = [i, j, k];
    return result;
}
function VectorMuliple(x0, y0, z0, x1, y1, z1) { // То же самое, но начало векторов - в [0. 0. 0] НЕ ИСПОЛЬЗУЕТСЯ
    let i = (y0 * z1 - z0 * y1);
    let j = (x0 * z1 - z0 * x1);
    let k = (x0 * y1 - y0 * x1);
    let result = [i, j, k];
    return result;
}