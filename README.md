# SpaceEmpire
Basic strategic space war game.

Start server with node game.js

SUP = Standard Unit of Power

Attributes of a missile:
9 - Stealth or RCS

drive is measured in kg of thrust

Things calculated:
Acceleration - function of thrust from drive power to mass.

Simplification of scanners:
scanner power is assumed to be kW
scanner sensitivity is considered to be the inverse
beam width is assumed to be 2 degrees
then range is:

      scanner^2 * rcs
r^4 = -----------------
      2 * pi * sin(2)^2

With jamming a little different.  Assume jammers are hemispherical, then
power reflected from target is:
scanner * rcs
-------------- = prf
r^2 * sin(2)^2

power received by scanner is:
    prf
------------ >= noise + scanner^-1
2 * pi * r^2

Noise is jammer + nature; nature is N, jammer is as follows:

 jammer^0.5
------------=
2 * pi * r^2


Minimum detectable power typically around 10^-12 W
Noise varies, set it around 4.15e-10 as a complete WAG!

Or another approach - let jamming help determine hit probability!

Jammer power needs to be spread out over a range of frequencies,
      how to calculate that?
      Would a smaller jammer cover less frequencies?
            If so then the hit probability should go up!

Consider:

hit probability = Ps / (Ps + Pj) at the range the weapon was fired.
      For missiles that would be when they detonate (and trigger lasers)


Need to settle on units and scale for all numbers to be somewhat consistent.