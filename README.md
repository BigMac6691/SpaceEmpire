# SpaceEmpire
Basic strategic space war game.

Start server with node game.js

SUP = Standard Unit of Power

So optimal laser has 1kSUP power.
    How much does a 2kSUP laser cost?
        Smaller should be cheaper up to a point then increase again.
        Larger more expensive.
    Mass?
        Hollow open ended cylinder + sphere 
    Volume?
        Open ended cylinder + sphere

DE example
Cost = power - base

Divergence fixed 1 micrometer / (pi * 0.1 m)
0.000001 / 0.314 = 0.000003183
A = sin(0.000003183)^2 * pi * d


Far future...
Calibrate lasers
da = wl / (pi * d)

Where
da = divergence angle
wl = wavelength
pi = is constant
d  = is diameter of bore

So 1 unit of power can burn through 1 cm of iron at 1 km in 1 second with wavelength of 10 micrometers and a bore of 10 cm

So tech base has an optimal value.  When deviating from that the cost grows according to a formula - i.e. Curve.  Mass and volume have their own formulas for growth.