// This class is intended to be used with 2 or fewer decimal points
class DisplayNumber
{
    static SCALE = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

    constructor(digits, decimal, opts)
    {
        this.value = 0;
        this.node = document.createElement("input");
        this.node.type = "text";
        this.node.disabled = true;
        this.node.value = this.value;

        this.digits = digits | 9;
        this.decimal = decimal | 2;

        if(opts)
            for(const [k, v] of Object.entries(opts))
                this.node[k] = v;
    }

    getNode()
    {
        return this.node;
    }

    getValue()
    {
        return this.value;
    }

    setValue(v)
    {
        this.value = v;

        this.displayValue();
    }

    displayValue()
    {
        let s = 0;
        let dec = this.decimal;
        let v = Math.abs(this.value);
        let wn = v >= 10 ? Math.ceil(Math.log10(v) + 1) : 1;

        if(wn > (this.digits - this.decimal))
        {
            dec = 0;

            console.log(`Display value calculations: Original v =${v}`);

            s = Math.ceil((wn - this.digits + this.decimal) / 3);
            v /= 1000 ** s;

            console.log(`s=${s}, v=${v}\n`);
        }

        let nf = 
        {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec
        }
    
        this.node.value = (+v).toLocaleString(undefined, nf) + DisplayNumber.SCALE[s];
    }
}