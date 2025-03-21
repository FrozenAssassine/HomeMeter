interface Emeter {
    power: number;
    pf: number;
    current: number;
    voltage: number;
    is_valid: boolean;
    total: number;
    total_returned: number;
}

interface PowerData {
    total_power: number;
    emeters: Emeter[];
}

async function loadPowerData(): Promise<PowerData | null> {
    const jsonData = await fetch("https://solar.frozenassassine.de/data/livepower.json").then((res) => res.json());
    return jsonData;
}

export { loadPowerData };

export type { PowerData, Emeter };
