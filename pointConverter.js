module.exports =  (function() {
    const Ax = 0.0
    const Ay = 0.0
    const Bx = 10.8822
    const By = 10.8776
    const Cx = -0.1128
    const Cy = -0.0140
    const Dx = -0.1925
    const Dy = - 0.1872
    const Ex = 0.0047
    const Ey = 0.0025
    const Fx = 0.0047
    const Fy = 0.0044


    const x_rest = -0.22358
    const y_rest = -0.1372162

    const L = 11
    const h = 3
    const COG = 3


    return convertDegreeToPoint = (x,y) => {
        Vx = x - (x_rest)
        Vy = y - (y_rest)

        theta_X = Ax + Bx*Vx + Cx*Vx**2 + Dx*Vx**3 + Ex*Vx**4 + Fx*Vx**5
        theta_Y = Ay + By*Vy + Cy*Vy**2 + Dy*Vy**3 + Ey*Vy**4 + Fy*Vy**5

        theta_X *= 0.0174532
        theta_Y *= 0.0174532

        Kd = -1/(2*h**2) + COG/(3*h**3) + 1/(2*L**2) - COG/(3*L**3)
        Kx = theta_X / Kd
        Ky = theta_Y / Kd

        cons = 1/(2*h) - COG/(6*h**2) + h/(2*L**2) - (COG*h)/(3*L**3) + COG/(2*L**2) - 1/L
        X_m = Kx*cons
        Y_m = Ky*cons

        return [X_m,Y_m]
    }
})();