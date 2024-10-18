import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStorageState<T> = [T, Dispatch<SetStateAction<T>>, boolean];

function useStorageState<T>(key: string, initialValue: T): UseStorageState<T> {
    const [state, setState] = useState<T>(initialValue);
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    // useCallback tp prevent re-rendering
    const loadState = useCallback(async () => {
        try {
            const storedValue = await AsyncStorage.getItem(key);
            if (storedValue !== null) {
                setState(JSON.parse(storedValue));
            }
        } catch (error) {
            console.error('Failed to load state from AsyncStorage', error);
        } finally {
            setIsHydrated(true);
        }
    }, [key]);

    const saveState = useCallback(async () => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save state to AsyncStorage', error);
        }
    }, [key, state]);

    // Effect to load state from AsyncStorage when the component mounts
    useEffect(() => {
        loadState();
    }, [loadState]);

    // Effect to save state to AsyncStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            saveState();
        }
    }, [state, isHydrated, saveState]);

    return [state, setState, isHydrated];
}

export default useStorageState;
