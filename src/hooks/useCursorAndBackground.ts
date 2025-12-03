"use client";
import { useEffect } from 'react';

interface UseCursorAndBackgroundOptions {
    bgColor?: string;
    cursorColor?: string;
}

export const useCursorAndBackground = (options: UseCursorAndBackgroundOptions = {}) => {
    const { bgColor = '#fff', cursorColor } = options;

    useEffect(() => {
        // Set background color
        if (bgColor) {
            document.body.style.backgroundColor = bgColor;
        }

        // Update cursor color if provided
        if (cursorColor) {
            const cursor = document.getElementById('ball');
            if (cursor) {
                cursor.style.backgroundColor = cursorColor;
            }
        }

        return () => {
            // Cleanup if needed
        };
    }, [bgColor, cursorColor]);
};

export default useCursorAndBackground;
