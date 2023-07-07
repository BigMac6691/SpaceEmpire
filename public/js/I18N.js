class I18N
{
    static text = new Map();

    static
    {
        I18N.text.set("design.weapon.energy.power", "Power output of emitter.");
        I18N.text.set("design.weapon.energy.frequency", "Base frequency of emitter.");
        I18N.text.set("design.weapon.energy.bore", "The diameter of the beam emitter.  Larger values here result in longer ranges."); //Θ = λ / (π * d)
        I18N.text.set("design.weapon.energy.capacitor", "A device to store power, can not be smaller than power.");
        I18N.text.set("design.weapon.energy.coupling", "The rate at which enrgy can be sent to the capactior.");

        I18N.text.set("design.name", "Short name.");
        I18N.text.set("design.mass", "Mass");
        I18N.text.set("design.volume", "Volume");
        I18N.text.set("design.cost", "How much money it takes to build.");
    }

    static getText(key, dflt)
    {
        if(this.text.has(key))
            return this.text.get(key);
        else
            return dflt;
    }
}