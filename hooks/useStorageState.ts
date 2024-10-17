import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStorageState<T> = [T, Dispatch<SetStateAction<T>>, boolean];

function useStorageState<T>(key: string, initialValue: T): UseStorageState<T> {
    const [state, setState] = useState<T>(initialValue);
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    // UseEffect to load the state from AsyncStorage when the component mounts
    useEffect(() => {
        const loadState = async () => {
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
        };

        loadState();
    }, [key]);

    // UseEffect to save the state to AsyncStorage when it changes
    useEffect(() => {
        const saveState = async () => {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(state));
            } catch (error) {
                console.error('Failed to save state to AsyncStorage', error);
            }
        };

        if (isHydrated) {
            saveState();
        }
    }, [key, state, isHydrated]);

    return [state, setState, isHydrated];
}

export default useStorageState;
