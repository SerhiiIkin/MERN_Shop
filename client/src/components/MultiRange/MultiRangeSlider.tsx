import "./multiRangeSlider.css";
import useInputMultiRange from "../../hooks/useInputMultiRange";

import { useMediaQuery } from "react-responsive";

const MultiRangeSlider = () => {
    const {
        minVal,
        maxVal,
        minValRef,
        maxValRef,
        onChangeMinValInput,
        onChangeMaxValInput,
        range,
        min,
        max,
    } = useInputMultiRange();

    const isDesktop = useMediaQuery({ query: "(min-width: 1281px)" });

    return (
        <>
            <div className="py-2 text-xl">Set a price</div>
            {!isDesktop && (
                <div className="pl-2 flex flex-col ">
                    <span className="pb-2">
                        <span>from</span>
                        <input
                            type="text"
                            id="inputMin"
                            className="input-price-change"
                            placeholder="price from"
                            value={minVal}
                            onChange={onChangeMinValInput}
                        />
                        <span className="pr-1">$</span>
                    </span>
                    <span>
                        <span className="pl-5">to</span>
                        <input
                            type="text"
                            className="input-price-change"
                            placeholder="price to"
                            value={maxVal}
                            id="inputMax"
                            onChange={onChangeMaxValInput}
                        />
                        <span>$</span>
                    </span>
                </div>
            )}
            {isDesktop && (
                <div className="py-4 mb-4">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        ref={minValRef}
                        onChange={onChangeMinValInput}
                        className="thumb thumb--zindex-3"
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        ref={maxValRef}
                        onChange={onChangeMaxValInput}
                        className="thumb thumb--zindex-4"
                    />

                    <div className="slider">
                        <div className="slider__track"></div>
                        <div ref={range} className="slider__range"></div>
                        <div className="slider__left-value">{minVal} $</div>
                        <div className="slider__right-value">{maxVal} $</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MultiRangeSlider;
