class I18N
{
    static text = new Map();

    static
    {
        I18N.text.set("design.weapon.energy.power", "Power output of emitter.");
        I18N.text.set("design.weapon.energy.frequency", "Base frequency of emitter.");
        I18N.text.set("design.weapon.energy.bore", "The diameter of the beam emitter.  Larger values here result in longer ranges."); //Θ = λ / (π * d)
        I18N.text.set("design.weapon.energy.capacitor", "A device to store power, can not be smaller than power.");
        I18N.text.set("design.weapon.energy.coupling", "The rate at which energy can be sent to the capactior.");

        I18N.text.set("design.weapon.missile.armour", "Amount of armour on missile, typically zero.");
        I18N.text.set("design.weapon.missile.drive", "Power of drive thrust.");
        I18N.text.set("design.weapon.missile.fuel", "Amount of fuel, used to determine range.");
        I18N.text.set("design.weapon.missile.warheads", "Number of warheads per missile.");
        I18N.text.set("design.weapon.missile.decoys", "Number of decoys per missile.");
        I18N.text.set("design.weapon.missile.power", "Power of each warhead.");
        I18N.text.set("design.weapon.missile.computer", "Computing capacity, mostly for targeting.");
        I18N.text.set("design.weapon.missile.scanner", "Power of scanner used to detect targets.");
        I18N.text.set("design.weapon.missile.jammer", "Power of jammer used to confuse targets.");
        I18N.text.set("design.weapon.missile.comms", "Number of communication channerls supported.");

        I18N.text.set("design.name", "Short name.");
        I18N.text.set("design.mass", "Mass");
        I18N.text.set("design.volume", "Volume");
        I18N.text.set("design.cost", "Cost");
    }

    static getText(key, dflt)
    {
        if(this.text.has(key))
            return this.text.get(key);
        else
            return dflt;
    }
}