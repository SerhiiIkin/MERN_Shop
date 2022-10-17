import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
    setMaxValueRange,
    setMinValueRange,
} from "../store/actions/productsActions";
import { useDebounce } from "./debounce";
import { useAppDispatch, useAppSelector } from "./redux";

function useInputMultiRange() {
    const { products, minValue, maxValue } = useAppSelector(
        (state) => state.products
    );
    const min = "0";
    const max = Math.round(
        Math.max(...products.map((el) => el.price)) + 1
    ).toString();
    console.log(maxValue);
    
    const [minVal, setMinVal] = useState(minValue);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const debouncedMinVal = useDebounce<string>(minVal.toString());
    const debouncedMaxVal = useDebounce<string>(maxVal.toString());

    useEffect(() => {
        dispatch(setMinValueRange(debouncedMinVal));
    }, [dispatch, debouncedMinVal]);

    useEffect(() => {
        dispatch(setMaxValueRange(debouncedMaxVal));
    }, [dispatch, debouncedMaxVal]);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - +min) / (+max - +min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(+minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(+maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    function onChangeMinValInput(event: ChangeEvent<HTMLInputElement>) {
        setMinVal(event.target.value);
    }

    function onChangeMaxValInput(event: ChangeEvent<HTMLInputElement>) {
        setMaxVal(event.target.value);
    }

    return {
        minVal,
        maxVal,
        minValRef,
        maxValRef,
        onChangeMinValInput,
        onChangeMaxValInput,
        range,
        min,
        max,
    };
}
export default useInputMultiRange;
