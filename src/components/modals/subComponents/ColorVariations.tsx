import React, { useState, useEffect } from "react";

const colors = [
    { code: "#F8B655", name: "Yellow" },
    { code: "#CBCBCB", name: "Gray" },
    { code: "#494E52", name: "Black" },
    { code: "#B4505A", name: "Brown" },
];

const ColorVariations = () => {
    const [activeColor, setActiveColor] = useState("#CBCBCB");

    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>("[data-bg-color]");
        elements.forEach((el) => {
            const bg = el.getAttribute("data-bg-color");
            if (bg) {
                el.style.backgroundColor = bg;
            }
        });
    }, []);

    return (
        <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveColor(color.code)}
                        className={`color tp-color-variation-btn ${activeColor === color.code ? "active" : ""
                            }`}
                        style={{ marginRight: "4px" }}
                    >
                        <span data-bg-color={color.code}></span>
                        <span className="tp-color-variation-tootltip">{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorVariations;
