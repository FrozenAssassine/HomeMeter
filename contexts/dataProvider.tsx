import { loadPowerData, PowerData } from "@/backend/powerDataParser";
import { DailySolarData, getAllSolarItems, loadAllData, loadData, SolarData } from "@/backend/solarDataParser";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface DataContextType {
    liveSolarData: SolarData | null;
    solarHistoryData: DailySolarData[];
    livePowerData: PowerData | null;
    reloadData: () => Promise<void>;
}

const DataProviderContext = createContext<DataContextType | undefined>(undefined);

const socket = io("https://solar.frozenassassine.de", {
    path: "/dataSocket",
    transports: ["websocket"],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [liveSolarData, setLiveSolarData] = useState<SolarData | null>(null);
    const [solarHistoryData, setSolarHistoryData] = useState<DailySolarData[]>([]);
    const [livePowerData, setLivePowerData] = useState<PowerData | null>(null);

    const fetchData = async () => {
        await loadAllData().then((data: string) => {
            let res = getAllSolarItems(data);
            const items = res.items;
            setSolarHistoryData(items);
        });

        await loadData().then((data) => {
            setLiveSolarData(data);
        });

        await loadPowerData().then((data) => setLivePowerData(data));
    };

    useEffect(() => {
        socket.on("liveData", (data) => {
            setLiveSolarData(data);
        });

        socket.on("historyData", (data) => {
            let res = getAllSolarItems(data);
            const items = res.items;
            if (items.length > 0) {
                setSolarHistoryData(items);
            }
        });

        socket.on("powerData", (data) => {
            setLivePowerData(JSON.parse(data));
        });

        fetchData();

        return () => {
            socket.off("liveData");
            socket.off("historyData");
            socket.off("powerData");
        };
    }, []);

    return (
        <DataProviderContext.Provider
            value={{
                liveSolarData: liveSolarData,
                solarHistoryData: solarHistoryData,
                livePowerData: livePowerData,
                reloadData: fetchData,
            }}
        >
            {children}
        </DataProviderContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataProviderContext);
    if (!context) {
        throw new Error("context must be used within a DataProvider");
    }
    return context;
};
