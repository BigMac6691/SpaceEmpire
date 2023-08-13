class K
{
    static NF0 = 
    {
        maximumFractionDigits: 0
    }

    static NF2 = 
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    // Planck's constant should be -34 but using THZ 10^12 amd mJ 10^3; E=hf
    static h = 6.626e-19; 

    static degToRad(deg)
    {
        return ((+deg % 360) / 180) * Math.PI;
    }
}