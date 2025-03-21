import { loadPowerData, PowerData } from "@/backend/powerDataParser";
import { DailySolarData, getAllSolarItems, loadAllData, loadData, SolarData } from "@/backend/solarDataParser";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface DataContextType {
    liveSolarData: SolarData | null;
    solarHistoryData: DailySolarData[];
    livePowerData: PowerData | null;
    reloadData: () => Promise<void>;
}

const DataProviderContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [liveSolarData, setLiveSolarData] = useState<SolarData | null>(null);
    const [solarHistoryData, setSolarHistoryData] = useState<DailySolarData[]>([]);
    const [livePowerData, setLivePowerData] = useState<PowerData | null>(null);

    const fetchData = async () => {
        try {
            const data = await loadData();
            setLiveSolarData(data);

            const allDataString = await loadAllData();
            const { items } = getAllSolarItems(allDataString);
            if (items.length > 0) {
                setSolarHistoryData(items);
            }

            const power = await loadPowerData();
            setLivePowerData(power);
        } catch (error) {
            alert("No Internet connection");
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
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
