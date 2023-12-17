import { SplatData } from "./SplatData";
import { Object3D } from "../core/Object3D";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";

class Splat extends Object3D {
    public selectedChanged: boolean = false;

    private _data: SplatData;
    private _selected: boolean = false;

    constructor(splat: SplatData | undefined = undefined) {
        super();

        this._data = splat || new SplatData();

        this.applyPosition = () => {
            this.data.translate(this.position);
            this.position = new Vector3();
        };

        this.applyRotation = () => {
            this.data.rotate(this.rotation);
            this.rotation = new Quaternion();
        };

        this.applyScale = () => {
            this.data.scale(this.scale);
            this.scale = new Vector3(1, 1, 1);
        };
    }

    saveToFile(name: string | null = null) {
        if (!document) return;

        if (!name) {
            const now = new Date();
            name = `splat-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.splat`;
        }

        this.applyRotation();
        this.applyScale();
        this.applyPosition();

        const buffer = this.data.serialize();
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.download = name;
        link.href = URL.createObjectURL(blob);
        link.click();
    }

    get data() {
        return this._data;
    }

    get selected() {
        return this._selected;
    }

    set selected(selected: boolean) {
        if (this._selected !== selected) {
            this._selected = selected;
            this.selectedChanged = true;
            this.dispatchEvent(this._changeEvent);
        }
    }
}

export { Splat };
